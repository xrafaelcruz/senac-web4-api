var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Service = new Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model("service", Service)
