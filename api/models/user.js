const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  role: {
    type: String,
    default: "guest",
    enum: ["admin", "guest"],
  },
});

module.exports = mongoose.model("User", mediaSchema);
