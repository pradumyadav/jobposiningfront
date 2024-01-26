const mongoose = require("mongoose");
const { Schema } = mongoose;

const userJobsSchema = new Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UserJob = mongoose.model("UserJob", userJobsSchema);
module.exports = UserJob;
