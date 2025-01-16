// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Initialize app and database
const app = express();
const db = new sqlite3.Database("users.db");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create users table if not exists
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`
);

// API endpoint to register a new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Periksa apakah email sudah terdaftar
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (user) return res.status(400).json({ message: "Email already registered" });

    // Enkripsi password dan simpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], function (err) {
      if (err) return res.status(500).json({ message: "Database error" });

      // Buat token JWT
      const token = jwt.sign({ id: this.lastID, email }, "your_secret_key", { expiresIn: "1h" });

      res.status(200).json({ message: "Registration successful", token }); // Kembalikan token
    });
  });
});

// API endpoint to login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "your_secret_key", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});