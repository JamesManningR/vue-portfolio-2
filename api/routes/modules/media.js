const media = require(`${__basedir}/controllers/media-contoller`);
const express = require("express");

const router = express.Router();
const auth = require(`${__basedir}/middleware/auth-check`);
const fileUpload = require(`${__basedir}/middleware/file-upload`);

router.post("/", auth.authAdmin, fileUpload.single("image"), media.createMedia);
router.get("/", media.getAllMedia);
router.get("/:id", media.getMediaById);

module.exports = router;
