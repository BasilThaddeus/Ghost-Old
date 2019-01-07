const mongoose = require("mongoose");

const votingSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    hasVoted: Boolean,
    whenVoted: String,
});

module.exports = mongoose.model("Voting", votingSchema);