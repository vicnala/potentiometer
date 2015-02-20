Potentiometer
=============

A simple proof of concept of Meteor with electronics, see this demo:

![Demo data graph](README IMAGEs/demo.png)

Arduino
=======

Connect a potentiometer to your [Arduino](http://www.arduino.cc/) board.

![Connecting a potentiometer to Arduino and Servo](README IMAGEs/wiring.png)

Then upload the Arduino sketch `node_serial_client.ino`:

Meteor
======

To install Meteor run:

~~~bash
$ curl https://install.meteor.com | sh
~~~

Run the Meteor app
------------------

~~~bash
$ cd potentiometer/meteor
$ meteor
~~~

Browse to [http://localhost:3000](http://localhost:3000)

The Gateway
===========

The gateway is a node Meteor client that stands for data at the serial port to send to the Meteor app.


Install Node.js
---------------

Go to the [Node download site](http://nodejs.org/download/).

Install node required packages
------------------------------

~~~bash
$ npm install ddp
$ npm install serialport
~~~

The client node app
-------------------

Using: https://github.com/voodootikigod/node-serialport with lots of examples!


Run the Node app
----------------

~~~bash
$ node node-client.js
~~~

Enjoy!
======
