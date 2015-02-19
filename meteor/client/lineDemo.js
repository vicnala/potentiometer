// Not used, but may need to truncate values of graph
// // .last(num) call to slice array for given length
// if (!Array.prototype.last){
//     Array.prototype.last = function(num){
//       return this.slice(this.length - num, this.length);
//     };
// }

function buildSpline(splineData) {
  $('#container-spline').highcharts({
      chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10
      },
      title: {
          text: 'Arduino Piped Potentiometer data'
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
                  Highcharts.numberFormat('P-Value: ', this.y, 2);
          }
      },
      legend: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      series: [{
          name: splineData.name,
          data: splineData.data
      }]
  });
}

// Call the function to built the chart when the template is rendered
Template.lineDemo.rendered = function() {
  return Meteor.subscribe("lineDemoData", function() {
    splineData = lineDemo.findOne();
    console.log(splineData);
    buildSpline(splineData);

    // Watch function -> take last array value and add new point reaplcing oldest point
    Meteor.autorun(function() { // refreshes every few seconds
      var handle = lineDemo.find({}).observeChanges({
        changed: function (id) {
          var record = lineDemo.findOne().data;
          // Choose only the most recent point
          var x = record[record.length - 1].x;
          var y = record[record.length - 1].y;
          // console.log([x, y]);
          Highcharts.charts[0].series[0].addPoint([x , y], true, true);
          // If you want to play around with adding new points from the console:
          // Highcharts.charts[0].series[0].addPoint([Highcharts.charts[0].series[0].data[19].x + 1000, Highcharts.charts[0].series[0].data[19].y*Math.random()+12], true, true)
        }
      });
    });
  });
};