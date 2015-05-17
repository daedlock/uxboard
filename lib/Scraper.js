module.exports = {
    RGBTodayScraper         : require("./scrapers/RGBToday.js"),
    SmashingMagazineScraper : require("./scrapers/SmashingMagazine.js"),
    MediumScraper           : require("./scrapers/Medium.js"),
    DribbbleScraper         : require("./scrapers/Dribbble.js"),

    allScrapers : function () {
        return [
            this.RGBTodayScraper,
            this.SmashingMagazineScraper,
            this.MediumScraper,
            this.DribbbleScraper
        ]
    }
};

