var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Expense = new Schema(
  {
    name: String,
    value: Number,
    expenseGroup: { type: ObjectId, ref: "expenseGroup" }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("expense", Expense);
