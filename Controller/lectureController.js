 const Lecture = require('../Models/lectures');


// exports.createLecture = async (req, res) => {
//   try {
//     const { title, companyDetails, description, tagas, skills, experienceRequired, salary } = req.body;
//     const newLecture = new Lecture({ title, companyDetails, description, tagas, skills, experienceRequired, salary });
//     await newLecture.save();
//     res.status(201).json(newLecture);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.getLecture = async (req, res) => {
//   try {
//     const lectures = await Lecture.find();
//     res.json(lectures);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// lectureController.js



exports.createLecture = async (req, res) => {
  try {
    const { title, companyDetails, description, tagas, skills, experienceRequired, salary, extraInformation } = req.body;

    // Create a new lecture
    const newLecture = new Lecture({ title, companyDetails, description, tagas, skills, experienceRequired, salary, extraInformation });

    // Save the lecture to the database
    await newLecture.save();

    res.status(201).json(newLecture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getLecture = async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
