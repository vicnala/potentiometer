TimeSeries = new Meteor.Collection('timeseries'); // Time series data

// Return data for the html template
if (Meteor.isClient) {
  Template.timeseries.helpers({
    timeseries: function () {
      Session.set("currentBike", 4);
      return TimeSeries.findOne({Bike: Session.get("currentBike")});
    }
  });
}

if (Meteor.isServer) {
  // Insert database for first commit
  if (TimeSeries.find().count() === 0) {
    for (var i = 0; i < 10; i++) {
      var filler = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      TimeSeries.insert({
        Bike: i,
        Lat: filler,
        Long: filler
      });
    };
  }

  Meteor.methods({
    'loop': function (cleanArray, schema) {
      for (var i = 0; i < cleanArray.length; i++) {
        console.log(i + ' = ' + schema[i] + ' : ' + cleanArray[i]);
      }
      // Prepare to udpate MongoDB
      var fields = {};
      fields["Lat." + cleanArray[4]] = cleanArray[1];
      fields["Long." + cleanArray[4]] = cleanArray[2];

      // Update MongoDB data
      var record = TimeSeries.findOne({Bike: cleanArray[0]});
      TimeSeries.update(
        record,
        { $set: fields }
      );

      // Check values
      // console.log("Node Value: " + cleanArray); // piped to shell
      // console.log("counter: " + record.cleanArray[1]); // piped to shell
      // console.log("counter: " + counter); // piped to shell
      console.log("data: " + cleanArray[1]); // piped to shell
      return "ok";
    }
  });
}