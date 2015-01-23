// Time series data
TimeSeries = new Meteor.Collection('timeseries');

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
      // {
      //   counter: 0,
      //   zero: 0,
      //   one: 1,
      //   two: 2,
      //   three: 3,
      //   four: 4,
      //   five: 5,
      //   six: 6,
      //   seven:7,
      //   eight: 8
      // }
    });
  }

  Meteor.methods({
    'loop': function (value) {
      console.log("Node Value: " + value); // piped to shell
      var record = TimeSeries.findOne();
      // var stringLS = "value.0";
      // TimeSeries.update(record, {$set: {stringLS: value}});
      TimeSeries.update(record, {$set: {"value.0": value}});

      // console.log("counter: " + record.value[1]); // piped to shell
      console.log("counter: " + record.counter); // piped to shell
      if (record.counter === 0) {
        TimeSeries.update(record, {$set: {"value.0": value}});
      } else if (record.counter === 1) {
        TimeSeries.update(record, {$set: {"value.1": value}});
      } else if (record.counter === 2) {
        TimeSeries.update(record, {$set: {"value.2": value}});
      } else if (record.counter === 3) {
        TimeSeries.update(record, {$set: {"value.3": value}});
      } else if (record.counter === 4) {
        TimeSeries.update(record, {$set: {"value.4": value}});
      } else if (record.counter === 5) {
        TimeSeries.update(record, {$set: {"value.5": value}});
      } else if (record.counter === 6) {
        TimeSeries.update(record, {$set: {"value.6": value}});
      } else if (record.counter === 7) {
        TimeSeries.update(record, {$set: {"value.7": value}});
      } else if (record.counter === 8) {
        TimeSeries.update(record, {$set: {"value.8": value}});
        TimeSeries.update(record, {$set: {counter: 0}});
      } else {
        return "not ok, error in record.counter";
        TimeSeries.update(record, {$set: {counter: 0}});
      }
      TimeSeries.update(record, {$inc: {counter: 1 }});
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
