const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Amkv@1234",
  database: "demo",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!"); 
});

app.use(bodyParser.json());
app.use(cors());

app.post("/properties", (req, res) => {
  const {
    owner_name,
    village,
    mandal,
    district,
    state,
    pin_number,
    survey,
    extent_of_land,
    user_id,
  } = req.body;

  const status = "Pending";

  const query = `INSERT INTO properties (owner_name, village, mandal, district, state, pin_number, survey, extent_of_land, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      owner_name,
      village,
      mandal,
      district,
      state,
      pin_number,
      survey,
      extent_of_land,
      user_id,
      status,
    ],
    (error, results, fields) => {
      if (error) throw error;
      res.status(201).json({ message: "Property added", id: results.insertId });
    }
  );
});

app.post("/createuser", (req, res) => {
  const { name, aadhar, mobile, address, email } = req.body;

  propertiesIds = "";

  const query = `INSERT INTO user_properties (name, aadhar_no, phone_number, address, email, property_ids) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [name, aadhar, mobile, address, email, propertiesIds],
    (error, results, fields) => {
      if (error) throw error;

      // Retrieve the ID of the new record inserted in the database
      const newId = results.insertId;

      res.status(201).json({ message: "User added", id: newId });
    }
  );
});

app.get("/users/:name", (req, res) => {
  const name = req.params.name;
  const query = "SELECT * FROM user_properties WHERE name = ?";

  connection.query(query, [name], (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/properties", (req, res) => {
  const query = "SELECT * FROM properties";
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/properties/notactive", (req, res) => {
  const query = "SELECT * FROM properties WHERE status <> 'Active'";
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM user_properties WHERE id = ?";
  connection.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM user_properties";
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send("Server Working!");
});

app.get("/properties/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM properties WHERE user_id = ?";

  connection.query(query, userId, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
