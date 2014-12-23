var DDPClient = require("ddp");

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
  if (error) {
    console.log('DDP connection error!');
    return;
  }

  console.log('connected to Meteor!');

  var serialport = require("serialport");
  var SerialPort = serialport.SerialPort; // localize object constructor
  // var serialPort = new SerialPort("/dev/ttyACM0", {
  var serialPort = new SerialPort("/dev/cu.usbmodem1411", {
    baudrate: 115200,
    // look for return and newline at the end of each data packet:
    parser: serialport.parsers.readline("\r\n")
  });

  function showPortOpen() { console.log('port open. Data rate: ' + serialPort.options.baudRate); }
  function saveLatestData(data) {
    var spin = data + 10;
    serialPort.write(spin);
    // Handle data
    // console.log(data);
    console.log('data received: ' + data);
    ddpclient.call('push', [data], function(err, result) {
      console.log('called function, result: ' + result);
    });
  }
  function showPortClose() { console.log('port closed.'); }
  function showError(error) { console.log('Serial port error: ' + error); }

  serialPort.on('open', showPortOpen);
  serialPort.on('data', saveLatestData);
  serialPort.on('close', showPortClose);
  serialPort.on('error', showError);
});
