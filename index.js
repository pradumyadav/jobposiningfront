const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const path = require('path');

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





// All routes
app.use('/', require('./Routers/index'));

// Server setup
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


