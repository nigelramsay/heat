var request = require('request');

module.exports = {
  stats: function(ip_address, success){
    request('http://' + ip_address + '/right.htm', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var actual, heat, set;

        var lines = response.body.split('\n');

        lines.forEach(function(line){
          var actualMatches = line.match(/<b>Actual.*font size='5'>(\d{1,2}\.\d)/);
          if(actualMatches != null){
            actual = Number(actualMatches[1]);
          }

          var heatMatches = line.match(/<b>Heat Status.*font size='4'>(O[NF]{1,2})/);
          if(heatMatches != null){
            heat = (heatMatches[1] == 'ON') ? 1 : 0;
          }

          var setMatches = line.match(/<b>Set.*font size='4'>(\d{1,2})/);
          if(setMatches != null){
            set = Number(setMatches[1]);
          }
        });

        var now = new Date();

        // console.log("" + now.toISOString() + ", " + actual + ", " + set + ", " + heat);
        // console.log({actual: actual, heat: heat, set: set});
        success({date: now, actual: actual, heat: heat, set: set})
      }
    });
  }
}
