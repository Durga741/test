const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: "visys_dev", // Replace with your PostgreSQL username
  host: "52.66.196.233", // Or your database server's IP
  database: "devdb", // The name of the database
  password: "dev@123", // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// API Route to Save Student Data
app.post("/api/students", async (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Details (name, email, course) VALUES ($1, $2, $3) RETURNING *",
      [name, email, course]
    );
    res.status(201).json({ message: "Student added successfully", student: result.rows[0] });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
