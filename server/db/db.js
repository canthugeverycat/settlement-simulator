const sqlite3 = require('sqlite3').verbose();

// Initialize the database and create tables
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS settlements (
      id INTEGER PRIMARY KEY,
      createdAt TEXT,
      party TEXT,
      status TEXT,
      amount REAL
    )
  `);
});

module.exports = db;
