var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Sign in
router.get('/signin', function(req, res, next) {
  res.render('signIn');
});
//Sign Up
router.get('/signUp', function(req, res, next) {
  res.render('signUp');
});
router.get('/addpost', function(req, res, next) {
  res.render('addpost');
});

module.exports = router;
