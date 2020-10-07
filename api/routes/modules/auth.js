const express = require("express");

const router = express.Router();
const user = require(`${__basedir}/controllers/users-controller`);

router.post("/login", user.loginUser);
router.post("/register", user.createUser);

module.exports = router;
