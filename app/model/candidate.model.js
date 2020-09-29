//Import Mongoose to Create Schema
const mongoose = require("mongoose");

//Create Schema
const CandidateModel = mongoose.Schema({
  imageUrl: String,
  email: String,
  name: String,
  slug: String,
  manifesto: String,
  no_of_votes: Number,
});

//Export Schema
module.exports = mongoose.model("Candidate", CandidateModel);
