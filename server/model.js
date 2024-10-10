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
    default: function () {
      //adjustment to Israel clock
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localTime = new Date(now.getTime() - offset * 60000); // Adjust for local time
      return localTime;
    },
  },
  completedTasks: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  Experimenter: mongoose.model("Experimenter", Experimenter),
};
