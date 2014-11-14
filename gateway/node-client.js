var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var output = [];
var parser = parse({delimiter: ','})
var input = fs.createReadStream('/etc/passwd');
var transformer = transform(function(record, callback){
  setTimeout(function(){
    callback(null, record.join(' ')+'\n');
  }, 500);
}, {parallel: 10});
input.pipe(parser).pipe(transformer).pipe(process.stdout);





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
    //parser: serialport.parsers.readline("\n"),
    baudrate: 115200
  });

  serialPort.on("open", function () {
    serialPort.on('data', function(data) {
      console.log('data received: ' + data);
      ddpclient.call('push', [data], function(err, result) {
        console.log('called function, result: ' + result);
      });
    });
  });
});
