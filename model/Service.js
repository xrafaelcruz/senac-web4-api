var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Service = new Schema({
    title: String
},
{
    versionKey: false
});

module.exports = mongoose.model("service", Service);
