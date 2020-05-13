const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("items", UserSchema);
