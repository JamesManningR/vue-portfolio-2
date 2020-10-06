// Get modules
const express = require("express");
const router = express.Router();

// Get routes

// Use routes
// Handle 404 error.
router.use("/404", function (req, res) {
  res.status(404).render("404");
});

// Handle 404 error.
router.use("*", function (req, res) {
  res.status(404).redirect("/404");
});

// Export router
module.exports = router;
