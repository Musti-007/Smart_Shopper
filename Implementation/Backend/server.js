const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const app = express();
const port = 3000;

// Initialize the SQLite database
const db = new sqlite3.Database("data/database.db");

// Create a users table
db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
);

app.use(express.json());
app.use(cors());

const jsonData = require("./data/supermarkets.json");

app.get("/api/data", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(jsonData);
});

// Create a new user
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create user" });
      }
      res.status(201).json({ id: this.lastID, username, password });
    }
  );
});

// Get all users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to retrieve users" });
    }
    res.json(rows);
  });
});

// Get a user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to retrieve user" });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});