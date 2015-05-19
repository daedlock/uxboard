var Scraper = require('../lib/Scraper.js');
var Article = require('../models/article');
var MetaBot = require("../lib/MetaBot.js");
var metaBot = new MetaBot();

var s = new Scraper.BehanceSraper();
s.scrape(function (articles) {
    articles.forEach(function (article) {
        //TODO: Check for article existance thru URL
        metaBot.parseArticleMeta(article, function (image) {
            console.log(image);
        })
    });
})
