var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Schedule = new Schema({
    date: String,
    time: String,
    user: { type: ObjectId, ref: "user" },
},
{
    versionKey: false
});

module.exports = mongoose.model("schedule", Schedule);
