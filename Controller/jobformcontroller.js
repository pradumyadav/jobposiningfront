// const JobApplication = require('../Models/jobApplication');
const JobApplication = require("../Models/jobformschema");
const path = require('path');
const nodemailer = require("nodemailer");
exports.createJobApplication = async (req, res) => {
  try {
    JobApplication.uploadedForm(req, res, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
      
      // If there is no error and the file is uploaded successfully, continue with creating the job application
      const { name, email, phone, address, coverLetter } = req.body;
      const resumePath = req.file.path;

      const newApplication = new JobApplication({
        name,
        email,
        phone,
        address,
        resume: resumePath,
        coverLetter,
        path: path.join(JobApplication.filePath, req.file.filename)
      });

      newApplication.save()
        .then(() => {
          res.status(201).json({ message: 'Job application submitted successfully' });
        })
        .catch((error) => {
          console.error("Error saving job application:", error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "pradumyadav900444@gmail.com", 
              pass: "Pradumyadav@2000", 
            },
          });
          
          
          app.post("/api/send-email/admin", async (req, res) => {
            // const { subject, body } = req.body;
            try {
              const mailOptions = {
                from: "pradumyadav900444@gmail.com", 
                to: "pradumyadav900444@gmail.com",
                subject,
                html: body,
              };
              await transporter.sendMail(mailOptions);
              res.status(200).send("Email sent to admin successfully.");
            } catch (error) {
              console.error("Error sending email to admin:", error);
              res.status(500).send("Failed to send email to admin.");
            }
          });
          
          
          app.post("/api/send-email/candidate", async (req, res) => {
            const { subject, body, recipient } = req.body;
            try {
              const mailOptions = {
                from: "your-email@gmail.com", 
                to: recipient, 
                subject,
                html: body,
              };
              await transporter.sendMail(mailOptions);
              res.status(200).send("Email sent to candidate successfully.");
            } catch (error) {
              console.error("Error sending email to candidate:", error);
              res.status(500).send("Failed to send email to candidate.");
            }
          });
    });
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();
    res.json(jobApplications);
  } catch (error) {
    console.error("Error getting job applications:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
