const fs = require('fs');
const path = require('path');
const db = require('./models/db'); // Your database connection

const sqlPath = path.join(__dirname, 'part1', 'dogwalks.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

db.query(sql)
  .then(() => {
    console.log('✅ dogwalks.sql has been imported successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error importing SQL file:', err.message);
    process.exit(1);
  });
