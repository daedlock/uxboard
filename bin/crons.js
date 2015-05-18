#! /usr/local/bin/node

var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = [53,0,03];
var j = schedule.scheduleJob(rule, function(){
    //Runs scraper on all sources daily at 5,8 am
    require("./scripts/runScraperOnce.js")();
});
