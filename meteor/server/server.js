Meteor.publish("lineDemoData", function() {
  return lineDemo.find();
});

Meteor.publish("TimeSeriesData", function() {
  return TimeSeries.find();
});