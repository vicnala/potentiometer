TimeSeries = new Meteor.Collection('timeseries'); // Time series data

// Return data for the html template
if (Meteor.isClient) {
  Template.timeseries.helpers({
    timeseries: function () {
      Session.set("currentBike", 4);
      return TimeSeries.findOne({Bike: Session.get("currentBike"), DD: 1});
    }
  });
}

if (Meteor.isServer) {
  // Insert database of bikes for first commit
  if (TimeSeries.find().count() === 0) {
    for (var i = 0; i < 10; i++) {
      for (var d = 0; d < 30; d++) {
        var filler = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        TimeSeries.insert({
          Bike: i,
          YYYY: 2014,
          MM: 2,
          DD: d,
          Lat: filler,
          Long: filler
        });
      }
    }
  }

  Meteor.methods({
    'loop': function (cleanArray, schema) {
      // Print out schema of received data
      for (var i = 0; i < cleanArray.length; i++) {
        console.log(i + ' = ' + schema[i] + ' : ' + cleanArray[i]);
      }

      // Prepare fields to udpate MongoDB
      var fields = {};
      fields["Lat." + cleanArray[4]] = cleanArray[1];
      fields["Long." + cleanArray[4]] = cleanArray[2];

      // Update MongoDB data based on bike number
      var record = TimeSeries.findOne({Bike: cleanArray[0]});
      TimeSeries.update(
        record,
        { $set: fields }
      );

      return "ok";
    }
  });
}