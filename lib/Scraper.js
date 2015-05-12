module.exports = {
  RGBTodayScraper: require("./scrapers/RGBToday.js"),
  SmashingMagazineScraper: require("./scrapers/SmashingMagazine.js"),
  MediumScraper: require("./scrapers/Medium.js"),
  allScrapers: function () {
    return [
      this.RGBTodayScraper,
      this.SmashingMagazineScraper,
      this.MediumScraper
    ]
  }
};

