const project = require(`${__basedir}/controllers/projects-controller`);
const express = require("express");

const router = express.Router();

// Create
router.post("/", project.createProject);
// Read
router.get("/", project.getProjects);
router.get("/:id", project.getProject);
// Update
router.put("/:id", project.updateProject);
// Delete
router.delete("/:id", project.deleteProject);

module.exports = router;
