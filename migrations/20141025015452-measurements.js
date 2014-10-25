var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('measurements', {
    id: { type: 'serial', primaryKey: true, autoIncrement: true },
    value: { type: 'decimal', notNull: true },
    code: { type: 'string', notNull: true },
    recorded_at: { type: 'timestamp', notNull: true }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('measurements', callback);
};
