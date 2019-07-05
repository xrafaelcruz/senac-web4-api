var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Receipt = new Schema(
  {
    value: String,
    date: Date,
    idUser: [{ type: ObjectId, ref: "user" }]
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("report", Receipt);
