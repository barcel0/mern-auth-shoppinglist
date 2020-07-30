const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route   POST /api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Some field is missing.' });
  }

  //Check for existing user
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exist.' });

      const newUser = new User({ name, email, password })

      //Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {

              jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                  }
                });
              });


            })
        })
      })
    })
    ;
});

module.exports = router;