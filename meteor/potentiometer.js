TimeSeries = new Meteor.Collection('timeseries'); // Time series data

// Return data for the html template
if (Meteor.isClient) {
  Template.timeseries.helpers({
    timeseries: function () {
      return TimeSeries.findOne();
    }
  });
}

if (Meteor.isServer) {
  // Insert database for first commit
  if (TimeSeries.find().count() === 0) {
    TimeSeries.insert({
      counter: 0,
      value: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    });
  }

  Meteor.methods({
    'loop': function (value) {
      // Prepare to udpate MongoDB
      var fields = {};
      counter = parseFloat(value[0]);
      fields["value." + counter] = value[1];
      fields["counter"] = counter;

      // Update MongoDB data
      var record = TimeSeries.findOne();
      TimeSeries.update(
        record,
        { $set: fields }
      );

      // Check values
      // console.log("Node Value: " + value); // piped to shell
      // console.log("counter: " + record.value[1]); // piped to shell
      console.log("counter: " + counter); // piped to shell
      console.log("data: " + value[1]); // piped to shell
      return "ok";
    }
  });
}



// Original single point values - raw arduino data
Values = new Meteor.Collection('values');

if (Meteor.isClient) {
  Template.value.helpers({
    value: function () {
      return Values.findOne();
    }
  });
}

if (Meteor.isServer) {
  if (Values.find().count() === 0) {
    Values.insert({value: 0});
  }

  Meteor.methods({
    'push': function (value) {
      console.log(value);
      var record = Values.findOne();
      Values.update(record, {$set: {value: value}});
      return "ok";
    }
  });
}
