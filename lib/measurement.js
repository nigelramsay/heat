var pg = require('pg');

module.exports = {
  save: function(recorded_at, measurement_code, value, success){
    var conString = "postgres://nigelramsay@localhost/heat";

    var client = new pg.Client(conString);
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      client.query("INSERT INTO measurements (value, code, recorded_at) \
                    VALUES ($1, $2, $3)",  [value, measurement_code, recorded_at], function(err, result) {
        if(err) {
          return console.error('Error saving measurement ' + measurement_code, err);
        }

        client.end();
      });
    });
    success();
  }
}