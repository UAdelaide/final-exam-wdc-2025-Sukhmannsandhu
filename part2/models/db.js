const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // or your MySQL password if set
  database: 'DogWalkService'
});

module.exports = db;
