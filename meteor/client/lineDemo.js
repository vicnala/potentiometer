function buildSpline(splineData) {
  $('#container-spline').highcharts({
      chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          // events: {
          //     load: function () {

          //         // set up the updating of the chart each second
          //         var series = this.series[0];
          //         console.log(this);
          //         setInterval(function () {
          //             var x = (new Date()).getTime(), // current time
          //                 y = Math.random();
          //             series.addPoint([x, y], true, true);
          //         }, 1000);
          //     }
          // }
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
          name: splineData.name,
          // 'Random data',
          data: splineData.data
          // (function () {
          //     // generate an array of random data
          //     var data = [],
          //         time = (new Date()).getTime(),
          //         i;

          //     for (i = -19; i <= 0; i += 1) {
          //         data.push({
          //             x: time + i * 1000,
          //             y: Math.random()
          //         });
          //     }
          //     console.log(data);
          //     return data;
          // }())
      }]
  });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.lineDemo.rendered = function() {
  return Meteor.subscribe("lineDemoData", function() {
    splineData = lineDemo.findOne();
    // console.log(splineData);
    buildSpline(splineData);
  });
};

// Create watch function -> take last array value and add as:
// Highcharts.charts[0].series[0].addPoint([x, y], true, true);

// from
// set up the updating of the chart each second
//         var series = this.series[0];
//         console.log(this);
//         setInterval(function () {
//             var x = (new Date()).getTime(), // current time
//                 y = Math.random();
//             series.addPoint([x, y], true, true);
//         }, 1000);
//     }