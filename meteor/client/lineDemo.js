function buildSpline(splineData) {
    $('#container-spline').highcharts('StockChart', {
        // chart : {
        //     events : {
        //         load : function () {

        //             // set up the updating of the chart each second
        //             var series = this.series[0];
        //             setInterval(function () {
        //                 var x = (new Date()).getTime(), // current time
        //                     y = Math.round(Math.random() * 100);
        //                 series.addPoint([x, y], true, true);
        //             }, 1000);
        //         }
        //     }
        // },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1 min'
            }, {
                count: 5,
                type: 'minute',
                text: '5 min'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Live random data'
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: splineData.name,
            data: splineData.data
        }]
        // series : [{
        //     name : 'Random data',
        //     data : (function () {
        //         // generate an array of random data
        //         var data = [], time = (new Date()).getTime(), i;

        //         for (i = -999; i <= 0; i += 1) {
        //             data.push([
        //                 time + i * 1000,
        //                 Math.round(Math.random() * 100)
        //             ]);
        //         }
        //         console.log(data[0]);
        //         return data;
        //     }())
        // }]
    });

}


// Not used, but may need to truncate values of graph
// // .last(num) call to slice array for given length
// if (!Array.prototype.last){
//     Array.prototype.last = function(num){
//       return this.slice(this.length - num, this.length);
//     };
// }

// function buildSpline(splineData) {
//   $('#container-spline').highcharts({
//       chart: {
//           type: 'spline',
//           animation: Highcharts.svg, // don't animate in old IE
//           marginRight: 10,
//           zoomType: 'x',
//           panning: true,
//           panKey: 'shift'
//       },
//       title: {
//           text: 'Arduino Piped Potentiometer data'
//       },
//       xAxis: {
//           type: 'datetime',
//           tickPixelInterval: 150
//       },
//       yAxis: {
//           title: {
//               text: 'Value'
//           },
//           plotLines: [{
//               value: 0,
//               width: 1,
//               color: '#808080'
//           }]
//       },
//       tooltip: {
//           formatter: function () {
//               return '<b>' + this.series.name + '</b><br/>' +
//                   Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
//                   Highcharts.numberFormat('P-Value: ', this.y, 2);
//           }
//       },
//       legend: {
//           enabled: false
//       },
//       exporting: {
//           enabled: false
//       },
//       series: [{
//           name: splineData.name,
//           data: splineData.data
//       }]
//   });
// }

// Call the function to built the chart when the template is rendered
Template.lineDemo.rendered = function() {
  return Meteor.subscribe("lineDemoData", function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    // var currentTime = (new Date()).getTime();
    // var limitTime = currentTime - 20*1000;
    splineData = lineDemo.findOne();
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
          // For highstock
          // Highcharts.charts[0].series[0].addPoint([Highcharts.charts[0].series[0].data[999].x + 1000, Highcharts.charts[0].series[0].data[999].y*Math.random()+12], true, true)
        }
      });
    });
  });
};