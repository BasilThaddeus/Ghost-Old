const Discord = require("discord.js");
const mongoose = require("mongoose");

let prefix = require("../configs/botConfig.json").prefix;

let Server = require("../models/server.js");
mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

module.exports = async(bot, member) => {
    Server.findOne({serverID: member.guild.id}, (err, server) =>{
        try {
            if(server.joinMessages === true){
                if(server.joinChannelID === "0") return;
                let welcomeChannel = member.guild.channels.get(server.joinChannelID);

                let welcomeEmbed = new Discord.RichEmbed()
                    .setAuthor(member.user.username, member.user.displayAvatarURL)
                    .setColor("#0cff00")
                    .setDescription("Welcome to the server!")
                    .setFooter(member.guild.name);
                welcomeChannel.send(welcomeEmbed);
            }
        } catch (err) {
            console.log(err);
        }
    });
};