var heatmiser = require('./lib/heatmiser.js');
var measurement = require('./lib/measurement.js')

heatmiser.stats('192.168.1.7', function(stats){
  measurement.save(stats.date, 'actual', stats.actual, function(){
    measurement.save(stats.date, 'set', stats.set, function(){
      measurement.save(stats.date, 'on', stats.heat, function(){
        console.log(stats.date.toISOString() + ", " + stats.actual + ", " + stats.set + ", " + stats.heat);
      })
    });
  });
});