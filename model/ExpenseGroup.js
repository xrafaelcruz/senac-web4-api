var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ExpenseGroup = new Schema(
  {
    title: String,
    percentage: Number,
    idReceipt: [{ type: ObjectId, ref: "receipt" }]
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("expenseGroup", ExpenseGroup);
