// Return data for the html template
if (Meteor.isClient) {
  return Meteor.subscribe("TimeSeriesData", function() {
    Template.timeseries.helpers({
      timeseries: function () {
        Session.set("currentBike", 4);
        return TimeSeries.findOne({Bike: Session.get("currentBike"), DD: 1});
      }
    });
  });
}