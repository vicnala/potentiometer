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

