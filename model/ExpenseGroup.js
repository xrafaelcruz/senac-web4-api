var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExpenseGroup = new Schema(
  {
    name: String,
    percentage: Number
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("expenseGroup", ExpenseGroup);
