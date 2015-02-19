// lineDemo
if (Meteor.isServer) {
  if (lineDemo.find().count() === 0) {
    console.log("Starting lineDemo with math!");

    // generate an array of random data
    var data = [],
        time = moment(moment().valueOf()),
        i;

    for (i = -30; i <= 0; i += 1) {
        data.push({
            x: time + i * 1000,
            y: Math.random()
        });
    }

    lineDemo.insert({
        name: 'Potentiometer Data',
        data: data
    });
  }

  Meteor.methods({
    'chart': function (dataSet) {
      // Prepare fields to udpate MongoDB
      var recordedValue = {
        x: dataSet.x,
        y: dataSet.Potentiometer
      };

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