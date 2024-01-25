
 

// instructor.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    Categories: { type: String },
    jobtypes: { type: String },
    // jobtlistring: { type: String },
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
