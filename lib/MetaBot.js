/*
 * Metabot is responsible for grabbing article information, summary, body and image. It uses unfluff
 * */

var unfluff = require("unfluff");
var request = require("request");
var extractor = require("unfluff");
var mongoose = require("mongoose");
var Article = require("../models/article.js");

function MetaBot() {

}

MetaBot.prototype.parseArticleMeta = function(article,cb) {
  request(article.url, function (err, response, body) {
    var data = extractor.lazy(body);
    try{
      cb(data.image());
    }
    catch(e){
      cb(null);
    };

  })
};

module.exports = MetaBot;
