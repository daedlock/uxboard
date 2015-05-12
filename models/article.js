var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/uxboard");

var ArticleSchema = mongoose.Schema({
  title: {type: String, index: true},
  description: {type: String, index: true},
  source: {type:String},
  url: {type:String,index:{unique:true}},
  updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Article",ArticleSchema);
