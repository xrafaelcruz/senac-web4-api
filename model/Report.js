var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Report = new Schema(
  {
    title: String,
    expenseList: [{ type: ObjectId, ref: "expense" }],
    expenseGroupList: [{ type: ObjectId, ref: "expenseGroup" }]
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("report", Report);
