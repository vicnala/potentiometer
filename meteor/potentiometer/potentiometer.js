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
      console.log(value['0']);
      var record = Values.findOne();
      Values.update(record, {$set: {value: value['0']}});
      return "ok";
    }
  });
}
