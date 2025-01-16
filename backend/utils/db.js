const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Tentukan lokasi database di folder proyek
const dbPath = path.resolve("./users.db");

// Inisialisasi database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Buat tabel `users` jika belum ada
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Users table ensured.");
    }
  }
);

module.exports = db;
