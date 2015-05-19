module.exports = {
    RGBTodayScraper         : require("./scrapers/RGBToday.js"),
    SmashingMagazineScraper : require("./scrapers/SmashingMagazine.js"),
    MediumScraper           : require("./scrapers/Medium.js"),
    DribbbleScraper         : require("./scrapers/Dribbble.js"),
    BehanceSraper           : require("./scrapers/Behance.js"),
    //CSSWinnerScraper : require("./scrapers/CSSWinner.js"),
    //MuzliScraper : require("./scrapers/MuzliScraper.js"),
    allScrapers             : function () {
        return [
            this.RGBTodayScraper,
            this.SmashingMagazineScraper,
            this.MediumScraper,
            this.DribbbleScraper,
            this.BehanceSraper
            //TODO: Uncomment after fixing CSSWinner,muzli Scraper
            //this.MuzliScraper
            //this.CSSWinnerScraper

        ]
    }
};

