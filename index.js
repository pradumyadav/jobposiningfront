const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const path = require('path');
const nodemailer = require("nodemailer");
const passportJWT = require('./Config/passport-jwt');
const db = require("./Config/mongoose");
const passport = require('./Config/passport-local');

app.use(cors({   
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'build')));

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());  


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", 
    pass: "your-email-password", 
  },
});


app.post("/api/send-email/admin", async (req, res) => {
  const { subject, body } = req.body;
  try {
    const mailOptions = {
      from: "your-email@gmail.com", 
      to: "admin@example.com",
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

// All routes
app.use('/', require('./Routers/index'));

// Server setup
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


