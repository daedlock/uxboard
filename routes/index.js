var express = require('express');
var router = express.Router();
var Article = require('../models/article');




/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find().lean().exec(function (err, docs) {

    res.render('index', { articles: docs });
  })
});

module.exports = router;
