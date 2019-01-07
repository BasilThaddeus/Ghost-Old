const Discord = require("discord.js");
const mongoose = require("mongoose");
const Server = require("../models/server.js");

mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

module.exports = async(bot, guild) => {
    Server.findOne({serverID: guild.id}, (err, server) => {
        if(err) console.log(err);
        if(!server){
            const newServer = new Server({
                serverID: guild.id,
                levelNotifications: true,
                levelType: "channel",
                joinMessages: false,
                joinChannelID: "0",
                leaveMessages: false,
                leaveChannelID: "0"
            });
            newServer.save().catch(err => console.log(err));
        }
    });
};
