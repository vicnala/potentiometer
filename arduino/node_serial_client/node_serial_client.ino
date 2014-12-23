int val;
int last;

void setup()
{
  Serial.begin(115200);
}

void loop()
{
  val = analogRead(2);
  // if (val != last) {
    last = val;
    Serial.println(val);
  // }
  delay(100);
}
