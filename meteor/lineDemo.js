if (Meteor.isServer) {
  // if (AdminAreaChart.find().count() === 0) {
  //   console.log("Starting AdminAreaChart with math!");
  //   AdminAreaChart.insert({
  //       name: 'Potentiometer Data',
  //       data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
  //   });
  // }
  Meteor.methods({
    'chart': function (dataSet) {
      // Prepare fields to udpate MongoDB
      var fields = {};
      fields["data." + dataSet.BikeNumber] = dataSet.Potentiometer;
      fields.x = dataSet.x;
      console.log(dataSet.Potentiometer);

      // Update MongoDB data based on bike number
      var record = AdminAreaChart.findOne();
      AdminAreaChart.update(
        record,
        { $set: fields }
      );

      return "ok";
    }
  });
}

function builtArea() {
  $('#container-area').highcharts({
      chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
              load: function () {

                  // set up the updating of the chart each second
                  var series = this.series[0];
                  setInterval(function () {
                      var x = (new Date()).getTime(), // current time
                          y = Math.random();
                      series.addPoint([x, y], true, true);
                  }, 1000);
              }
          }
      },
      title: {
          text: 'Live random data'
      },
      xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
      },
      yAxis: {
          title: {
              text: 'Value'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                  Highcharts.numberFormat(this.y, 2);
          }
      },
      legend: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      series: [{
          name: 'Random data',
          data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                  data.push({
                      x: time + i * 1000,
                      y: Math.random()
                  });
              }
              return data;
          }())
      }]
  });
}

/*
 * Call the function to built the chart when the template is rendered
 */
if (Meteor.isClient) {
  Template.lineDemo.rendered = function() {
    // BarData = AdminAreaChart.findOne();
    console.log("BarData");
    builtArea();
  };
}