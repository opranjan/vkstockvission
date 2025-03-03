const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin');

// @route    POST api/admin
// @desc     Create an admin
// @access   Public (you should make this protected in a real-world app)
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if admin already exists
      let admin = await Admin.findOne({ username });
      if (admin) {
        return res.status(400).json({ msg: 'Admin already exists' });
      }

      // Create new admin
      admin = new Admin({
        username,
        password: await bcrypt.hash(password, 10)
      });

      await admin.save();
      res.json({ msg: 'Admin created successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
