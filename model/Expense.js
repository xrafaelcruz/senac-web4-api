var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Expense = new Schema(
  {
    name: String,
    value: Number,
    idExpenseGroup: { type: ObjectId, ref: "expenseGroup" },
    idReceipt: { type: ObjectId, ref: "receipt" }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("expense", Expense);
