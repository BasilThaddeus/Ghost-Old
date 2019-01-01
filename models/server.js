const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    serverID: String,
    levelNotifications: Boolean,
    levelType: String
});

module.exports = mongoose.model("Server", serverSchema);