const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',         // <-- Add a comma here
  database: 'DogWalkService'
});
module.exports = pool;