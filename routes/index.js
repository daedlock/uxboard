var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {

  Article.find().exec(function (err, articles) {
    res.render('index', { articles: articles });
  })
});

module.exports = router;
