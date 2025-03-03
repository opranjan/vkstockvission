const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserData = require('../models/UserData');

// @route    POST api/userData
// @desc     Store user data
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('segment', 'Segment is required').not().isEmpty(),
    check('investment', 'Investment must be a number').isNumeric(),
    check('message', 'Message is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, segment, investment, message } = req.body;

    try {
      let userData = new UserData({
        name,
        email,
        phone,
        segment,
        investment,
        message
      });

      await userData.save();
      res.json({ msg: 'User data saved successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/userData
// @desc     Fetch all user data
// @access   Public
router.get('/', async (req, res) => {
  try {
    const userData = await UserData.find();
    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
