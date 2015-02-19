// Name serial port - there should be a smarter way to do this, but this seems easiest
// var currentPort = "/dev/ttyACM0"; // A PC serial port
// var currentPort = "/dev/cu.usbmodem" + "1411"; // direct left port
// var currentPort = "/dev/cu.usbmodem" + "1421"; // direct right port
var currentPort = "/dev/cu.usbmodem" + "14211"; // indirect right port: closest to aux power

var DDPClient = require("ddp");

// For handling time data
var moment = require('moment');
moment().format();

// For remote connections:
// var ddpclient = new DDPClient({
//   host: "gw2event.meteor.com",
//   port: 80,
//   auto_reconnect: true,
//   auto_reconnect_timer: 500
// });
// Source: https://github.com/oortcloud/node-ddp-client/issues/21

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
  // Confirm DDP/Meteor Connection
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
    // look for ; character to signify end of line
    parser: serialport.parsers.readline(";")
  });

  function showPortOpen() { console.log('port open. Data rate: ' + serialPort.options.baudRate); }

  function saveLatestData(data) {
    // See what data comes through
    // console.log('data received: ' + data);
    var array = data.split(','); // CSV Data Parse:
    // Print each parsed data
    var schema = ['Potentiometer'];
    for (var i = 0; i < array.length; i++) {
       // console.log(i + ' = ' + schema[i] + ' : ' + array[i]);
    }

    // Clean up string array into a set of numbers and account for any NaN conversion issues:
    var cleanArray = [];
    var countError = 0;
    for (var count = 0; count < array.length; count++) {
      cleanArray[count] =  parseFloat(array[count]);
      // console.log(count + ' at: ' + cleanArray[count]);
      // Check for NaN error
      // if (~~cleanArray[count] === 0) {
      //   console.log("*****************NaN PROBLEM*****************");
      //   console.log(array[count]);
      //   countError++;
      // }
    }
    if (cleanArray.length !== 1) {
      console.log('*****************' + cleanArray + '*****************');
      countError++;
    }

    // Get current time data
    cleanArray[1] = (new Date()).getTime();

    // Create JS object to pass to Meteor
    var dataSet = {
      Potentiometer: cleanArray[0],
      x: cleanArray[1]
    };

    if (countError === 0) { // no number errors
      ddpclient.call('chart', [dataSet], function(err, result) {
        console.log('data sent: ' + cleanArray);
        console.log('called chart function, result: ' + result);
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