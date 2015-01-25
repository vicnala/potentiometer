// Name serial port - there should be a smarter way to do this, but this seems easiest
// var currentPort = "/dev/ttyACM0"; // A PC serial port
var currentPort = "/dev/cu.usbmodem" + "1411"; // direct left port
// var currentPort = "/dev/cu.usbmodem" + "1421"; // direct right port

var DDPClient = require("ddp");

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
    parser: serialport.parsers.readline("\r\n")
  });

  function showPortOpen() { console.log('port open. Data rate: ' + serialPort.options.baudRate); }
  function saveLatestData(data) {
    // Error Checking
    console.log('data received: ' + data);

    // Push data to Arduino
    // var spin = data + 10;
    // serialPort.write(spin);
    // Copied from the documentation - use at own risk
    // serialPort.write(spin, function(err, results) {
    //   console.log('err ' + err);
    //   console.log('results ' + results);
    // });

    // CSV Data Parse:
    var array = data.split(',');

    // Call Meteor actions with "data"
    ddpclient.call('push', [data], function(err, result) {
      console.log('called push function, result: ' + result);
    });
    ddpclient.call('loop', [array], function(err, result) {
      console.log('called Loop function, result: ' + result);
    });
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
