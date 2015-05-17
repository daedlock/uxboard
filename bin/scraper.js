var Scraper = require('../lib/Scraper.js');
var Article = require('../models/article');
var MetaBot = require("../lib/MetaBot.js");


var metaBot = new MetaBot();
Scraper.allScrapers().forEach(function (_Scraper) {
  var s = new _Scraper();
  s.scrape(function (articles) {
    articles.forEach(function (article) {
      //TODO: Check for article existance thru URL
      console.log("Got Article: "+article);
      metaBot.parseArticleMeta(article, function (image) {
        if(image!=null){
          article.image = image;
          var a = new Article(article);
          a.save(function (err) {
            console.log("SAVED ARTICLE with url "+ article.url);

            if (err) return console.log(err);

          });
        }
      });
    });
  })
});



