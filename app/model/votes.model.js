const mongoose = require("mongoose");

const VotesSchema = mongoose.Schema({
  voterEmail: String,
  votesId: Array,
});

module.exports = mongoose.model("Votes", VotesSchema);
