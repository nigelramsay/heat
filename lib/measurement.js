var pg = require('pg');

module.exports = {
  save: function(recorded_at, measurement_code, value, success){
    var conString = "postgres://nigelramsay:goodgood@localhost/heat";

    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }

      client.query("INSERT INTO measurements (value, code, recorded_at) \
                    VALUES ($1, $2, $3)",  [value, measurement_code, recorded_at], function(err, result) {
        if(err) {
          return console.error('Error saving measurement ' + measurement_code, err);
        }

        done();
      });
    });

    success();
  }
}
