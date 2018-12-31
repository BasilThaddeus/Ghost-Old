const mongoose = require("mongoose");

const levelingSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    level: Number,
    xp: Number
});

module.exports = mongoose.model("Level", levelingSchema);