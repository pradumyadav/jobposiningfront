const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
      .use('/instructor', require('./instructor'))
      .use('/lecture', require('./lecture'))
      .use("/jobform",require('./jobformroutes'))
      .get('/',(req, res) => {
            res.send('Home Page');
      }); 
      

module.exports = router;


