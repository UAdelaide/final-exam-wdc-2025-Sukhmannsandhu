const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // use your password if set, else leave blank
  database: 'DogWalkService',
  multipleStatements: true // important for multiple SQL commands
});

module.exports = pool.promise();
