Meteor.subscribe("BikeData");

// Return data for the html template
Template.bikedataTemp.helpers({
  timeseries: function () {
    Session.set("currentBike", 4);
    return TimeSeries.findOne({Bike: Session.get("currentBike"), DD: 1});
  }
});