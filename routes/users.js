const express = require('express');
const router = express.Router();
const passport = require('passport')
const config = require('../config/config');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const TokenHelper = require('../helpers/tokenHelper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, (err, docs) => {
    if (!err) {
      res.json(docs.map(doc => doc.username));
    } else {
      console.log(err);
    }
  });
});

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({success: false, msg: 'Please pass valid email, username and password.', 'body': req.body});
  } else {
    let newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    // save the user, save the world
    newUser.save(err => {
      if (err) {
        return res.json({success: false, msg: err});
      }

      res.json({success: true, msg: 'Successfully created new user.'});
    })
  }
});

router.post('/signin', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.toObject(), config.passportSecret);
          // return the information including token as JSON
          res.status(200).json({token: 'JWT ' + token});
        } else {
          res.status(401).json({msg: 'Authentication failed.  Wrong password.'});
        }
      });
    }
  });
});

// sanity check method to make sure authentication is working
router.post('/me', passport.authenticate('jwt', { session: false}), function(req, res) {
  const token = TokenHelper.getToken(req.headers);
  if (token) {
    return res.json({success: true, msg: 'something', user: req.user});
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;
