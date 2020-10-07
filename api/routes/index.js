// Get modules
const express = require("express");
const router = express.Router();

// Get routes
const projectsRoute = require("./modules/projects");

// Use routes
router.use("/projects", projectsRoute);

// 404 route
router.use("/404", function (req, res) {
  res.status(404).render("404");
});

// Non Error Fallback route
router.use("*", function (req, res) {
  res.status(404).redirect("/404");
});

// Export router
module.exports = router;
