var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/uxboard");
mongoose.connect(require("../config/database").mongoConnectionString);

var ArticleSchema = mongoose.Schema({
    title       : {type : String, index : true},
    description : {type : String, index : true},
    source : {
        title : "String",
        url   : "String"
    },
    url         : {type : String, index : {unique : true}},
    image       : {type : String},
    updated_at  : {type : Date, default : Date.now}
});


module.exports = mongoose.model("Article", ArticleSchema);
