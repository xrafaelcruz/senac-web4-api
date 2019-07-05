var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    phone: String,
    username: String,
    profile: String
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("user", UserSchema);
