Potentiometer
=============

A simple proof of concept of Meteor with electronics

Arduino
=======

Connect a potentiometer to your [Arduino](http://www.arduino.cc/) board.

![Connecting a potentiometer to Arduino](http://arduino.cc/en/uploads/Tutorial/potentiometer.jpg "Connecting a potentiometer to Arduino")

Then upload the Arduino sketch `arduino/node_serial_client/node_serial_client.ino`:

~~~C
int val;
int last;

void setup() 
{ 
  Serial.begin(115200); 
}

void loop() 
{
  val = analogRead(2);
  if (val != last) {
    last = val;
    Serial.write(val);
  }
  delay(100);
}
~~~

Meteor
======

To install Meteor run:

~~~bash
$ curl https://install.meteor.com | sh
~~~

Now create the `potentiometer` Meteor project:

~~~bash
$ meteor create potentiometer
~~~

The HTML
--------

~~~html
<head>
  <title>Potentiometer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  {{> value}}
</body>

<template name="value">
  <h1>{{value.value}}</h1>
</template>
~~~

The CSS
-------

~~~css
h1 {
	font-family: sans-serif;
	font-size: 5rem;
	padding-left: 2rem;
}
~~~

The JavaScript
--------------

~~~js
Values = new Meteor.Collection('values');

if (Meteor.isClient) {
  Template.value.value = function () {
    return Values.findOne();
  };
}


if (Meteor.isServer) {
  if (Values.find().count() === 0) {
    Values.insert({value: 0});
  }

  Meteor.methods({
    'push': function (value) {
      console.log(value['0']);
      var record = Values.findOne();
      Values.update(record, {$set: {value: value['0']}});
      return "ok";
    }
  });
}
~~~

Run the Meteor app
------------------

~~~bash
$ cd potentiometer
$ meteor
~~~

Browse to [http://localhost:3000](http://localhost:3000)

The Gateway
===========

The gateway is a node Meteor client that stands for data at the serial port to send to the Meteor app.


Install Node.js
---------------

Go to the [Node download site](http://nodejs.org/download/).

Create a directory for the gateway
----------------------------------

~~~bash
$ mkdir gateway
~~~

Install node required packages
------------------------------

~~~bash
$ cd gateway
$ npm install ddp
$ npm install serialport
~~~

The client node app
-------------------

~~~js
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
  var serialPort = new SerialPort("/dev/ttyACM0", {
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

~~~

Run the Node app
----------------

~~~bash
$ cd gateway
$ node node-client.js
~~~


Enjoy!
======