// To test the ability to set the motor by the switch and then by meteor:

// Switch
int val;
int last;

// For Node.js/Meteor
int counter = 0;

void setup()
{
   Serial.begin(115200);
   // int serialPos = 0;
   // myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop()
{
   // Update Counter Variable
   if (counter == 8) {
     counter = 0;
   } else {
     counter = counter +1;
   }
   Serial.print(counter);
   Serial.print(",");

   val = analogRead(2);
   Serial.println(val);

   delay(500);
}