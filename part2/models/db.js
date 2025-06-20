const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // use your actual password if any
  multipleStatements: true // ✅ this is the fix!
});

module.exports = pool;
