var ArticleScraper = require("./ArticleScraper.js");

function MediumScraper() {
    this.source = "Medium";
    ArticleScraper.call(this, global.UXBoard.sources.medium);
}
MediumScraper.prototype = new ArticleScraper();

MediumScraper.prototype.parse = function () {
    var self = this;
    return function (error, response, body) {
        var json = body.match(/(?:GLOBALS = )(.+)/igm)[0].replace('GLOBALS = ', '');
        json = JSON.parse(json);
        json.embedded.posts.forEach(function (post) {
            self.articles.push({
                title       : post.title,
                url         : "https://medium.com/@" + post.creator.username + "/" + post.uniqueSlug,
                description : post.virtuals.snippet,
                source : {
                    url   : self.source.url,
                    title : self.source.title
                } || "n/a"
            })
        });

        self.clean();
        self.callback(self.articles);
    }
}

module.exports = MediumScraper;
