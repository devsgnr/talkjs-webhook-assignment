const mongoose = require("mongoose");

const VotersSchema = new mongoose.Schema({
  email: { type: String, createIndex: true },
  votingCode: String,
  hasVoted: Boolean,
});

module.exports = mongoose.model("Voters", VotersSchema);
