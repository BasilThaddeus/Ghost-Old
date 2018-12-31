const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userID: String,
    serverID: String,
    money: Number,
    bank: Number,
    bankMax: Number
});

module.exports = mongoose.model("Money", moneySchema);