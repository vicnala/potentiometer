Meteor.publish("lineDemoData", function() {
  return lineDemo.find();
});