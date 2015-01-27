// Time series data
TimeSeries = new Meteor.Collection('timeseries');

// Return the data to Meteor
if (Meteor.isClient) {
  Template.timeseries.helpers({
    timeseries: function () {
      return TimeSeries.findOne();
    }
  });
}

if (Meteor.isServer) {
  if (TimeSeries.find().count() === 0) {
    TimeSeries.insert({
      counter: 0,
      value: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    });
  }

  Meteor.methods({
    'loop': function (value) {
      console.log("Node Value: " + value); // piped to shell
      var record = TimeSeries.findOne();

      // TimeSeries.update(record, {$set: {"value.0": value[1]}});
      counter = parseFloat(value[0]);
      // TimeSeries.update(record, {$set: {counter: counter}});

      if (counter === 0) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.0": value[1],
              counter: counter
            }
          });
        console.log("success: " + 0 + "*"); // piped to shell
      } else if (counter === 1) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.1": value[1],
              counter: counter
            }
          });
        console.log("success: " + 1 + "*"); // piped to shell
      } else if (counter === 2) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.2": value[1],
              counter: counter
            }
          });
        console.log("success: " + 2 + "*"); // piped to shell
      } else if (counter === 3) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.3": value[1],
              counter: counter
            }
          });
        console.log("success: " + 3 + "*"); // piped to shell
      } else if (counter === 4) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.4": value[1],
              counter: counter
            }
          });
        console.log("success: " + 4 + "*"); // piped to shell
      } else if (counter === 5) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.5": value[1],
              counter: counter
            }
          });
        console.log("success: " + 5 + "*"); // piped to shell
      } else if (counter === 6) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.6": value[1],
              counter: counter
            }
          });
        console.log("success: " + 6 + "*"); // piped to shell
      } else if (counter === 7) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.7": value[1],
              counter: counter
            }
          });
        console.log("success: " + 7 + "*"); // piped to shell
      } else if (counter === 8) {
        TimeSeries.update(
          record,
          {$set:
            {
              "value.8": value[1],
              counter: counter
            }
          });
        console.log("success: " + 8 + "*"); // piped to shell
        // TimeSeries.update(record, {$set: {counter: 0}}); // Reset Mongo-counter
      } else {
        return "not ok, error in counter";
        // TimeSeries.update(record, {$set: {counter: 0}}); // Reset Mongo-counter
      }
      // Update Mongo-counter
      // This doesn't work for some reason...replaced with data piped from Arduino
      // Might take too long to increase value or it is failing intermittently
      // TimeSeries.update(record, {$inc: {counter: 1}});
      // The last mongo update won't always run if it is directly followed by return

      // Check values
      // console.log("counter: " + record.value[1]); // piped to shell
      console.log("counter: " + counter); // piped to shell
      console.log("data: " + value[1]); // piped to shell
      return "ok";
    }
  });
}



// Original single point values
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
