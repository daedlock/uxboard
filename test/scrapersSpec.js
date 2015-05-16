var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var Scraper = require("../lib/Scraper.js");
var request = require("request");

describe("Scrapers", function () {

  describe("Medium", function () {
    it("has not changed dom structure", function (done) {
      var bot = new Scraper.MediumScraper();
      bot.scrape(function (articles) {
        chai.expect(articles).not.to.have.length(0);
        done();
      });
    });
  });



  describe("RGBToday", function () {
    it("has not changed dom structure", function (done) {
      var bot = new Scraper.RGBTodayScraper();
      bot.scrape(function (articles) {
        chai.expect(articles).not.to.have.length(0);
        done();
      });
    });
  });

  describe("Smashing Magazine", function () {
    it("has not changed dom structure", function (done) {
      var bot = new Scraper.SmashingMagazineScraper();
      bot.scrape(function (articles) {
        chai.expect(articles).not.to.have.length(0);
        done();
      });
    });
  });


});
