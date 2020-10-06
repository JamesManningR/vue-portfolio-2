const Project = require("../models/project");
const HttpError = require("../models/http-error");

// Create
const createProject = async (req, res, next) => {
  const createdProject = new Project(
    ({ title, body, featuredImage, images, skills, links, featured } = req.body) // eslint-disable-line no-undef
  );
  let result;
  try {
    result = await createdProject.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not create project", 500);
    return next(error);
  }
  res.status(201).json(result);
};

// READ
// All projects
const getProjects = async (req, res, next) => {
  const params = req.query;
  let projects;
  try {
    projects = await Project.find(params)
      .populate("featuredImage")
      .populate("images")
      .exec();
  } catch (err) {
    console.log("Error getting projects: ", err);
    const error = new HttpError("We were unable to gather projects.", 500);
    return next(error);
  }
  if (!projects) {
    const error = new HttpError(`No projects Found`, 404);
    return next(error);
  }
  res.json(projects);
};

// Single project
const getProject = async (req, res, next) => {
  const projectId = req.params.id;
  let project;
  try {
    project = await Project.findById(projectId)
      .populate("images")
      .populate("featuredImage")
      .exec();
  } catch (err) {
    // If there was an error
    const error = new HttpError("We were unable to find this project.", 500);
    return next(error);
  }
  // If there was no project found
  if (!project) {
    const error = new HttpError(
      `Could not find project with Id ${projectId}`,
      404
    );
    return next(error);
  }
  res.json(project);
};

const updateProject = async (req, res, next) => {
  let result;
  try {
    result = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("We were unable to update this project.", 500);
    return next(error);
  }
  res.json(result);
};

const deleteProject = async (req, res, next) => {
  const projectId = req.params.id;
  let result;
  try {
    result = await Project.findByIdAndDelete(projectId);
  } catch (err) {
    const error = new HttpError("We were unable to delete this project", 500);
    return next(error);
  }
  if (!result) {
    const error = new HttpError("Could not find project with ID", 404);
    return next(error);
  }
  res.json(result);
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
