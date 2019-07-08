var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Report = new Schema(
  {
    value: String,
    date: Date,
    idUser: { type: ObjectId, ref: "user" },
    expenseGroupList: [
      {
        name: String,
        percentage: Number,
        expenseList: [
          {
            name: String,
            value: Number
          }
        ]
      }
    ]
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("report", Report);
