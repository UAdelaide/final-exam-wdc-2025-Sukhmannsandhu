const fs = require('fs');
const path = require('path');
const pool = require('./models/db');

async function runSQLFile() {
  const filePath = path.join(__dirname, '../part1/dogwalks.sql');
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    const queries = sql.split(/;\s*$/m); // Split by semicolons
    for (const query of queries) {
      if (query.trim()) {
        await pool.query(query);
      }
    }
    console.log('✅ dogwalks.sql executed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error running SQL file:', err);
    process.exit(1);
  }
}

runSQLFile();