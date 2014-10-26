var fs = require('fs')
var measurement = require('./lib/measurement.js')

var buffer = fs.readFile(process.argv[2], 'utf8', function(err, data){
  data.toString().split('\n').forEach(function(line){
    var entries = line.split(',');

    measurement.save(entries[0], 'actual', entries[1], function(){
      measurement.save(entries[0], 'set', entries[2], function(){
        measurement.save(entries[0], 'on', entries[3], function(){
          console.log(entries.join(', '));
        })

  });
});

