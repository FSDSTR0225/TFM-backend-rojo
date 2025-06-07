const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    projectSkills: [{ type: String }], 
    professionalRole: { type: String },
    duration: { type: String },
    year: { type: Number },
    gallery: [{ type: String }], 
    videoUrl: { type: String, default: null },
    codeSections: [{ type: String }],
    liveLink: { type: String },
    githubProjectLink: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // Usuarios que dieron like
    likes: { type: Number, default: 0 },  // Cantidad de likes actual
    views: { type: Number, default: 0 },  
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
