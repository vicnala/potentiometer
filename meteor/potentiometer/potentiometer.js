// Time series data
TimeSeries = new Meteor.Collection('timeseries');

if (Meteor.isClient) {
  Template.timeseries.timeseries = function () {
    return TimeSeries.findOne();
  };
}

if (Meteor.isServer) {
  if (TimeSeries.find().count() === 0) {
    TimeSeries.insert({
      value: {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven:7,
        eight: 8
      }
    });
  }

  Meteor.methods({
    'loop': function (value) {
      console.log(value.now);
      var record = TimeSeries.findOne();
      TimeSeries.update(record, {$set: {"value.zero": value}});
      return "ok";
    }
  });
}



// Original single point values
Values = new Meteor.Collection('values');

if (Meteor.isClient) {
  Template.value.value = function () {
    return Values.findOne();
  };
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
