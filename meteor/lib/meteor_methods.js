// Meteor.methods({
//   lineDemo: function() {
//     return Highcharts.charts[0];
//   },

//   UpdateSeriesData: function() {
//     var last = lineDemo.find( {}, { data: { $slice: -1 } } );

//     console.log("last");
//     console.log(last);

//     Meteor.call("lineDemo").series[0].addPoint([last], true, true);
//   }
// });