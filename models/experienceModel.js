const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        companyLogo: { type: String },
        experienceSkills: [{ type: String }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    }
);

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
  