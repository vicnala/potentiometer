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
