var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema(
  {
    name: String,
    status: { type: String, default: "Active" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
