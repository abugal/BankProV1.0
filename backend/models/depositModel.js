const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const depositSchema = new Schema(
  {
    customerId: {
      // type: mongoose.Schema.Types.ObjectId,
      type: Number,
    },
    name: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deposit", depositSchema);
