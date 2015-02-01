// Name serial port - there should be a smarter way to do this, but this seems easiest
// var currentPort = "/dev/ttyACM0"; // A PC serial port
// var currentPort = "/dev/cu.usbmodem" + "1411"; // direct left port
// var currentPort = "/dev/cu.usbmodem" + "1421"; // direct right port
var currentPort = "/dev/cu.usbmodem" + "14211"; // indirect right port: closest to aux power

var DDPClient = require("ddp");
var moment = require('moment');
moment().format();

// Connect to Meteor
var ddpclient = new DDPClient({
  host: "localhost",
  port: 3000,
  /* optional: */
  auto_reconnect: true,
  auto_reconnect_timer: 500,
  use_ejson: true,  // default is false
  use_ssl: false, //connect to SSL server,
  use_ssl_strict: true, //Set to false if you have root ca trouble.
  maintain_collections: true //Set to false to maintain your own collections.
});

ddpclient.connect(function(error) {
  // Error Checking
  if (error) {
    console.log('DDP connection error!');
    return;
  }
  console.log('connected to Meteor!');

  // Configure serial port
  var serialport = require("serialport");
  var SerialPort = serialport.SerialPort; // localize object constructor
  var serialPort = new SerialPort(currentPort, {
    baudrate: 115200,
    // look for return and newline at the end of each data packet:
    // parser: serialport.parsers.readline("\r\n")
    // look for ; character to signify end of line
    parser: serialport.parsers.readline(";")
  });

  function showPortOpen() { console.log('port open. Data rate: ' + serialPort.options.baudRate); }
  function saveLatestData(data) {
    // See what data comes through
    // console.log('data received: ' + data);
    var array = data.split(','); // CSV Data Parse:
    // Print each parsed data
    var schema = ['Bike Number', 'Lat', 'Long', 'Potentiometer', "time (s)", "time (mm)", "time (HH)", "time (DD)", "time (MM)", "time (YYYY)"];
    for (var i = 0; i < array.length; i++) {
       // console.log(i + ' = ' + schema[i] + ' : ' + array[i]);
    }

    // Get current time data
    var testTime = moment().format("ss-mm-HH-DD-MM-YYYY");
    var splitTime = testTime.split('-'); // dash date data parse
    for (var t = 0; t < splitTime.length; t++) {
      // console.log(t + ' = ' + splitTime[t]);
      array.push(splitTime[t]); // Extend the array:
    }

    // Clean up string array into a set of numbers and account for any NaN conversion issues:
    var cleanArray = [];
    var countError = 0;
    for (var count = 0; count < array.length; count++) {
      cleanArray[count] =  parseFloat(array[count]);
      // console.log(count + ' at: ' + cleanArray[count]);
      if (~~cleanArray[count] === 0) {
        // console.log("*****************NaN PROBLEM*****************");
        countError++;
      }
    }

    if (countError === 0) { // no number errors
      // Call Meteor actions with "data"
      ddpclient.call('loop', [cleanArray, schema], function(err, result) {
        console.log('data sent: ' + cleanArray);
        console.log('called Loop function, result: ' + result);
        console.log(' ');
      });
    }

  }

  // Error Checking
  function showPortClose() { console.log('port closed.'); }
  function showError(error) { console.log('Serial port error: ' + error); }

  // Node events - trigger specific functions upon specific events
  serialPort.on('open', showPortOpen);
  serialPort.on('data', saveLatestData);
  serialPort.on('close', showPortClose);
  serialPort.on('error', showError);
});
