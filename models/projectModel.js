const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    urls: [{ type: String }],
    technologiesUsed: [{ type: String }],
    duration: { type: String },
    types: [{ type: String }],
    date: { type: Date },
    // Mentions? => for later
    multimedia: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
