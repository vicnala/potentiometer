if (Meteor.isServer) {

  Meteor.publish("lineDemoData", function() {
    return lineDemo.find();
  });

  Meteor.publish("BikeData", function() {
    return TimeSeries.find();
  });

}