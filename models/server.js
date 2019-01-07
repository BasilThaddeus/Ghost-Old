const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    serverID: String,
    levelNotifications: Boolean,
    levelType: String,
    joinMessages: Boolean,
    joinChannelID: String,
    leaveMessages: Boolean,
    leaveChannelID: String
});

module.exports = mongoose.model("Server", serverSchema);