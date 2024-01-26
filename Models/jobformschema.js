// models/JobApplication.js
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const filePath = '/Uploads/Resume'; // Update the file path accordingly

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  resume: { type: String, required: true },
  path: { type: String }, 
  coverLetter: { type: String }
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '..' + filePath)); // Destination folder
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });

jobApplicationSchema.statics.uploadedForm = multer({ storage: storage }).single('resume'); // Apply multer middleware
jobApplicationSchema.statics.filePath = filePath;

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
