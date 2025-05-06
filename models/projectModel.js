const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {

    title: { type: String }, // Título visible del proyecto
    description: { type: String },
    category: { type: String }, // UX/UI, Frontend, etc.
    technologiesUsed: [{ type: String }],
    duration: { type: String },
    types: [{ type: String }], // tipo de proyecto si aplica
    date: { type: Date },
    image: { type: String }, // Imagen destacada del proyecto
    urls: [{ type: String }], // URLs adicionales
    multimedia: { type: String }, // video, imagen u otro recurso
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