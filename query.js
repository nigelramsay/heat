var request = require('request');

request('http://192.168.1.7/right.htm', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var actual, heat, set;

    var lines = response.body.split('\n');

    lines.forEach(function(line){
      var actualMatches = line.match(/<b>Actual.*font size='5'>(\d{1,2}\.\d)/);
      if(actualMatches != null){
        actual = actualMatches[1];
      }

      var heatMatches = line.match(/<b>Heat Status.*font size='4'>(O[NF]{1,2})/);
      if(heatMatches != null){
        heat = (heatMatches[1] == 'ON');
      }

      var setMatches = line.match(/<b>Set.*font size='4'>(\d{1,2})/);
      if(setMatches != null){
        set = setMatches[1];
      }
    });

    console.log("Actual: " + actual);
    console.log("Heat: " + heat);
    console.log("Set: " + set);
  }
});
