// .last(num) call to slice array for given length
if (!Array.prototype.last){
    Array.prototype.last = function(num){
      return this.slice(this.length - num, this.length);
    };
}

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
          // 'Random data',
          data: splineData.data
          // data: splineData.data.last(20)
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
    // splineData = lineDemo.find( {}, { data: { $slice: -1 } } ).fetch();
    console.log(splineData);
    buildSpline(splineData);
    // buildSpline(splineData[0]);


  Meteor.autorun(function() { // refreshes every few seconds
    var handle = lineDemo.find({}).observeChanges({
      changed: function (id) {
        var record = lineDemo.findOne().data;
        var x = record[record.length - 1].x;
        var y = record[record.length - 1].y;
        console.log([x, y]);
        Highcharts.charts[0].series[0].addPoint([x , y], true, true);
      }

      //   if (!initializing)
      //     self.changed("counts", roomId, {count: count});
      // }
      // removed: function (id) {
      // don't care about changed
    });
  });
  // Highcharts.charts[0].series[0].addPoint([Highcharts.charts[0].series[0].data[19].x + 1000, Highcharts.charts[0].series[0].data[19].y*Math.random()+12], true, true)
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