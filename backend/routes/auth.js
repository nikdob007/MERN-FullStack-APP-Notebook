const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_TOKEN = 'Codewithnikunjgoodb$oy';

// ROUTE 1: Create a User using: POST   "/api/auth/createuser". Doesn't require Auth 
router.post('/createuser', [
  body('email', 'Enter valid Email').isEmail(),
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // check the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    data = {
      user: {
        id: user.id
      }
    }
    var authToken = jwt.sign(data, JWT_TOKEN)
    success = true;
    res.json({ success, authToken: authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2:  Authenticate a User using: POST   "/api/auth/login".  
router.post('/login', [
  body('email', 'Enter valid Email').isEmail(),
  body('password', 'password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Please try to login correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please try to login correct credentials" });
    }

    data = {
      user: {
        id: user.id
      }
    }
    
    var authToken = jwt.sign(data, JWT_TOKEN)
    success = true;
    res.json({ success, authToken: authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 3:  Get loggedin user details using: POST "/api/auth/getuser". Login required  
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router