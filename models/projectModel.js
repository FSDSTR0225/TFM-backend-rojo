const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    projectSkills: [{ type: String }], // o technologiesUsed si prefieres ese nombre 
    professionalRole: { type: String },
    duration: { type: String },
    year: { type: Number },
    gallery: [{ type: String }], // URLs de imágenes
    videoUrl: { type: String, default: null },
    codeSections: [{ type: String }],
    liveLink: { type: String },
    githubProjectLink: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
