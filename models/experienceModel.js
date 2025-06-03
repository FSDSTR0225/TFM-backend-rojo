const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
      company: { type: String },
      position: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      companyLogo: { type: String },
      owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        }
    }
);

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
  