const express = require('express');
const router = express.Router();
const app = express();
const TokenHelper = require('../helpers/tokenHelper');
const passport = require('passport');
const Post = require('../models/posts.js');
const slug = require('slug');
const moment = require('moment');

router.post('/new', passport.authenticate('jwt', { session: false}), (req, res) => {
  const token = TokenHelper.getToken(req.headers);
  if (!token){
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  } else {
    const titleSlug = slug(moment().format('MMM-Do-YY') + '-' + slug(req.body.title));

    let newPost = new Post({
      title: req.body.title,
      tags: req.body.tags,
      category: req.body.category,
      body: req.body.body,
      abstract: req.body.abstract,
      mainImageUrl: req.body.mainImageUrl,
      user: req.user,
      createDate: moment().format(),
      slug: titleSlug
    });

    newPost.save(err => {
      if (err) {
        return res.json({success: false, msg: err});
      }
      return res.json({
        success: true, 
        msg: 'New post created',
        slug: titleSlug
      });
    })
  }
});

router.get('/all/:index/:count', (req, res) => {
  new Promise((resolve, reject) => {
    console.log('getting posts')
    const docs = Post.find().populate('user');
    if (docs) {
      console.log('find docs successful');
      resolve(docs);
    }
    else {
      console.log('find docs failed');
      reject(Error('Something went wrong'));
    }
  })
    .then(docs => {
      console.log('promise returned something')
      return res.json({
        success: true,
        docs: docs
      })
    })
    .catch(error => {
      console.log('well, crap.')
      return error;
    });
});

router.get('/view/:titleSlug', (req, res) => {
  new Promise((resolve, reject) => {
    const doc = Post.findOne({slug: req.params.titleSlug});
    if (doc) {
      console.log(`found doc for slug ${req.params.titleSlug}`);
      resolve(doc);
    } else {
      reject(Error('no post found'));
    }
  })
    .then(doc => {
      console.log('promise returned something');
      return res.json({
        success: true,
        doc: doc
      })
    })
    .catch(error => {
      console.log('something went kablooey')
    });
});


module.exports = router;
