function buildSpline(splineData) {
    $('#container-spline').highcharts('StockChart', {
        rangeSelector: {
            buttons: [{
                count: 0.5,
                type: 'minute',
                text: '0.5 m'
            }, {
                count: 1,
                type: 'minute',
                text: '1 min'
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
            name: splineData.name, // single string
            data: splineData.data // array with objects x and y
        }]
    });

}

// Call the function to built the chart when the template is rendered
Template.lineDemo.rendered = function() {
  return Meteor.subscribe("lineDemoData", function() {
    Highcharts.setOptions({
      global: {
        useUTC: false // use local time
      }
    });

    splineData = lineDemo.findOne();
    buildSpline(splineData);

    // Watch function -> take last array value and add new point reaplcing oldest point
    var handle = lineDemo.find({}).observeChanges({
      changed: function (id) {
        var record = lineDemo.findOne().data;

        // Choose only the most recent point
        var x = record[record.length - 1].x;
        var y = record[record.length - 1].y;
        // console.log([x, y]);

        // Add new point with animation using Highstocks API
        Highcharts.charts[0].series[0].addPoint([x , y], true, true);
        // If you want to play around with adding new points from the console:
        // Highcharts.charts[0].series[0].addPoint([Highcharts.charts[0].series[0].data[999].x + 1000, Highcharts.charts[0].series[0].data[999].y*Math.random()+12], true, true)
      }
    });
  });
};