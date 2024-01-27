const JobApplication = require("../Models/jobformschema");
const path = require("path");
const nodemailer = require("nodemailer");

exports.createJobApplication = async (req, res) => {
  try {
    JobApplication.uploadedForm(req, res, async (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Error uploading file" });
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
        path: path.join(JobApplication.filePath, req.file.filename),
      });

      await newApplication.save();

      // Send emails
      await sendEmailToAdmin(name);
      await sendEmailToCandidate(email);

      res
        .status(201)
        .json({ message: "Job application submitted successfully" });
    });
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function sendEmailToAdmin(name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pradumyadav900444@gmail.com",
      pass: "idrjpwwiodzhatfh",
    },
  });

  try {
    const mailOptions = {
      from: "pradumyadav900444@gmail.com",
      to: "sachinvermaa1234@gmail.com",
      subject: `Application submitted by ${name}`,
      html: "<h1>Hello Admin!</h1><p>An application has been submitted.</p>",
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin successfully.");
  } catch (error) {
    console.error("Error sending email to admin:", error);
    throw new Error("Failed to send email to admin.");
  }
}

async function sendEmailToCandidate(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pradumyadav900444@gmail.com",
      pass: "idrjpwwiodzhatfh",
    },
  });

  try {
    const mailOptions = {
      from: "pradumyadav900444@gmail.com",
      to: email,
      subject: "Application Submitted Successfully",
      html: "<h1>Application Submitted Successfully</h1>",
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent to candidate successfully.");
  } catch (error) {
    console.error("Error sending email to candidate:", error);
    throw new Error("Failed to send email to candidate.");
  }
}
