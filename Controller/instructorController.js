// const Instructor = require('../Models/instructor');

// exports.createInstructor = async (req, res) => {
//   try {
//     const { Categories, jobtype, joblisting } = req.body;

//     // Create a new instructor
//     const newInstructor = new Instructor({ Categories, jobtype, joblisting });

//     // Save the instructor to the database
//     await newInstructor.save();

//     res.status(201).json(newInstructor);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.getAllInstructor = async (req, res) => {
//   try {
//     const instructors = await Instructor.find();
//     res.json(instructors);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// instructorController.js

const Instructor = require('../Models/instructor');

exports.createInstructor = async (req, res) => {
  try {
    const { Categories, jobtypes} = req.body;

    // Create a new instructor
    const newInstructor = new Instructor({ Categories, jobtypes });

    // Save the instructor to the database
    await newInstructor.save();

    res.status(201).json(newInstructor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllInstructor = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
