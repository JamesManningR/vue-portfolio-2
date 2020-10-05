// Import libraries
const express = require("express");
const bodyParser = require("body-parser");

// Add features
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/another", (req, res) => {
  res.send("Another route");
});

// Init
app.listen(5000, (err) => {
  console.log("Listening");
});
