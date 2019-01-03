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
            if(server.leaveMessages === true){
                if(server.leaveChannelID === "0") return;
                let leaveChannel = member.guild.channels.get(server.leaveChannelID);

                let leaveEmbed = new Discord.RichEmbed()
                    .setAuthor(member.user.username, member.user.displayAvatarURL)
                    .setColor("#ff003d")
                    .setDescription("See you later!")
                    .setFooter(member.guild.name);
                leaveChannel.send(leaveEmbed);
            }
        } catch (err) {
            console.log(err);
        }
    });
};