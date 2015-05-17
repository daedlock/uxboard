var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/uxboard");
mongoose.connect("mongodb://root:root@ds031842.mongolab.com:31842/uxboard");

var ArticleSchema = mongoose.Schema({
  title: {type: String, index: true},
  description: {type: String, index: true},
  source: {type:String},
  url: {type:String,index:{unique:true}},
  image: {type:String},
  updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Article",ArticleSchema);
