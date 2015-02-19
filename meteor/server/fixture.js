// lineDemo
if (Meteor.isServer) {
  if (lineDemo.find().count() === 0) {
    console.log("Starting lineDemo with math!");

    // generate an array of random data
    var data = [],
        time = moment(moment().valueOf()),
        i;

    for (i = -9999; i <= 0; i += 1) {
        data.push([
            time + i * 1000,
            Math.random()
        ]);
    }

    lineDemo.insert({
        name: 'Potentiometer Data',
        data: data
    });
  }

  Meteor.methods({
    'chart': function (dataSet) {
      // Prepare fields to udpate MongoDB
      var recordedValue = [
        dataSet.x,
        dataSet.Potentiometer
      ];

      // Update MongoDB data based on bike number
      var record = lineDemo.findOne();
      lineDemo.update(
        record,
        { $push: {data: recordedValue} }
      );

      return "ok";
    }
  });
}