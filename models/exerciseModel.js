const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Exercise Database Schema
const ExerciseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
