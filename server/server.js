const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

let db = new sqlite3.Database('./myDB.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

const app = express();
app.use(cors()); // This will enable all CORS requests
app.use(bodyParser.json());

// Get all Constraint_Class
app.get('/Constraint_Class', (req, res) => {
  db.all('SELECT * FROM Constraint_Class', [], (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

// Get a single user
app.get('/users/:id', (req, res) => {
  db.get('SELECT * FROM Users WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    });
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const data = [req.body.name, req.body.email];
  db.run('INSERT INTO Users (name, email) VALUES (?, ?)', data, function (err) {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": req.body,
      "id": this.lastID
    });
  });
});

// Update a user
app.patch('/users/:id', (req, res) => {
  const data = [req.body.name, req.body.email, req.params.id];
  db.run(
    `UPDATE Users SET name = ?, email = ? WHERE id = ?`,
    data,
    function (err) {
      if (err) {
        res.status(500).json({ "error": err.message });
        return;
      }
      res.json({ "message": "success", "data": req.body });
    }
  );
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  db.run(
    `DELETE FROM Users WHERE id = ?`,
    req.params.id,
    function (err) {
      if (err) {
        res.status(500).json({ "error": err.message });
        return;
      }
      res.json({ "message": "deleted", "changes": this.changes });
    }
  );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

