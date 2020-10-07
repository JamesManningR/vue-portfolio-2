// Used for easy access to root dir (makes modules a lot easier to refactor)
// 0 - Utilities
global.__basedir = __dirname;

// Import libraries
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Get ENV
const mongoUri = `mongodb://${process.env.MONGO_URI}:${process.env.MONGO_PORT}`;

// Add features ---------------------------------------------
const app = express();
app.use(bodyParser.json());
// Deprecation error fix
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// Database -------------------------------------------------
const connectDb = () => {
  mongoose.connect(mongoUri, { useNewUrlParser: true });
};
connectDb();

// Handle the database connection and retry as needed
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("There was a problem connecting to mongo: ", err);
  console.log("Retrying");
  setTimeout(() => connectDb(), 5000);
});
db.once("open", () => console.log("Successfully connected to mongo"));

// Import Routes
const routes = require("./routes");
app.use(routes);

// Eroor Fallback Route
app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    message: err.message || "Something went wrong",
    code: err.code || 500,
  });
  return next();
});

// Init
app.listen(5000, (err) => {
  console.log("Listening");
});
