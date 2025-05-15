const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String },
    technologiesUsed: [{ type: String }],
    duration: { type: String },
    types: [{ type: String }],
    date: { type: Date },
    image: { type: String },
    urls: [{ type: String }],
    multimedia: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
