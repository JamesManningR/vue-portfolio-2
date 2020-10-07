const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String },
});

module.exports = mongoose.model("Media", mediaSchema);
