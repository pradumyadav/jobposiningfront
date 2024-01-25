require("dotenv").config();
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    // Generate a salt and hash the password asynchronously
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({ ...req.body, password: hashedPassword });
    const response = await user.save();

    try {
      await new Promise((resolve, reject) => {
        req.login(response, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      const token = jwt.sign(response.id, JWT_SECRET_KEY);
      res
        .status(201)
        .json({ id: user.id, role: user.role, token });
    } catch (loginError) {
      res.status(400).json(loginError);
    }
  } catch (err) {
    // Handle errors here
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user;
  const token = jwt.sign(user.id,"sssss")
  res
    .status(201)
    .json({ id: user.id, role: user.role, token });
};

exports.getUser = async (req, res) => {
  const user = req.user;
  res
    .status(201)
    .json(user);
};

exports.logout = async (req, res) => {
  req.logout();
  res.json({ success: true, message: 'User logged out successfully' });
}
