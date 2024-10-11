const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Experimenter = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
 createdAt: {
    type: Date,
    default: Date.now,
  },
  completedTasks: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  Experimenter: mongoose.model("Experimenter", Experimenter),
};
