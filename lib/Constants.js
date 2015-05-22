var UXBoard = {
    sources : {
        dribbble         : {
            url                 : "https://dribbble.com/search?q=ux+ui",
            title               : "Dribbble",
            articleSelector     : ".dribbble-shot",
            titleSelector       : "strong",
            descriptionSelector : "span.comment"
        },
        rgbToday         : {
            url                 : "http://rgb.today",
            title               : "RGB.Today",
            articleSelector     : ".reddit-post",
            titleSelector       : ".title",
            descriptionSelector : ".description"
        },
        medium           : {
            url                 : "https://medium.com/search?q=ux",
            title               : "Medium",
            articleSelector     : ".block.post",
            titleSelector       : ".block-title a",
            descriptionSelector : ".block-snippet"
        },
        smashingMagazine : {
            url                 : "http://smashingmagazine.com",
            title               : "Smashing Magazine",
            articleSelector     : "article.post",
            titleSelector       : "h2 a[property]",
            descriptionSelector : "p"
        },
        muzli            : {},
        cssWinner        : {
            url                 : "http://www.csswinner.com",
            title               : "Smashing Magazine",
            articleSelector     : ".templateWinner.thecombo",
            titleSelector       : "h2 a[property]",
            descriptionSelector : "dummy"
        },
        behance          : {
            url                 : "https://www.behance.net/search?field=132&content=projects&sort=appreciations&time=week",
            title               : "Smashing Magazine",
            articleSelector     : ".js-item",
            titleSelector       : ".WWrap h3 a",
            descriptionSelector : "dummy"
        }
    }
};

global.UXBoard = UXBoard;