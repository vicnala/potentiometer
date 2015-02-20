// Example sketch of passing data to meteor through Node

// Value to store potentiometer data
int val;
// stringOutput
String stringOutput;

void setup()
{
   Serial.begin(115200);
}

void loop()
{
  stringOutput = "";
  val = analogRead(2);
  stringOutput += val;
  stringOutput += ";"; // dataset break

  Serial.print(stringOutput);

  delay(1000);
}