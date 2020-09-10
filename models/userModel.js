const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

//Create a Model from Schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
