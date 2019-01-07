const Discord = require("discord.js");
const mongoose = require("mongoose");
const Server = require("../models/server.js");
const Money = require("../models/money.js");
const Leveling = require("../models/leveling.js");

mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

module.exports = async(bot, guild) => {
    Server.deleteMany({serverID: guild.id}, function(err) {
        if(err) console.log(err);
    });
    Money.deleteMany({serverID: guild.id}, function(err) {
        if(err) console.log(err);
    });
    Leveling.deleteMany({serverID: guild.id}, function(err) {
        if(err) console.log(err);
    });
};
