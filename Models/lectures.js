// const mongoose = require("mongoose");

// const lectureSchema = new mongoose.Schema({
//   title: { type: String},
//   companyDetails: { type: Date},
//   description: { type: String},
//   tagas: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Course",
  
//   },
//   Skills: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Instructor",
  
//   },
// });

// const Lecture = mongoose.model("Lecture", lectureSchema);

// module.exports = Lecture;

const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyDetails: { type: String, required: true },
  description: { type: String, required: true },
  tagas: { type: String }, 
  skills: { type: String }, 
  experienceRequired: { type: String }, 
  salary: { type: Number }, 
  extraInformation: { type: String } 
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
