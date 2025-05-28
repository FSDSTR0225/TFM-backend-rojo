const mongoose = require("mongoose");
  
const StudySchema = new mongoose.Schema(
      {
        instituteName: { type: String },
        instituteLogo: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        degree: { type: String },
        description: { type: String },
        location: { type: String },
        multimedia: { type: String },
        owner: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: false,
          }
      }
  );
  
const Study = mongoose.model("Study", StudySchema);
module.exports = Study;
    