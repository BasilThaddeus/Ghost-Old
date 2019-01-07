const Discord = require("discord.js");
const mongoose = require("mongoose");
const Money = require("../models/money.js");
const Leveling = require("../models/leveling.js");
const Server = require("../models/server.js");

mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

module.exports = async(bot, member) => {
        try {
            Server.findOne({serverID: member.guild.id}, (err, server) => {
                if (server.leaveMessages === true) {
                    if (server.leaveChannelID === "0") return;
                    let leaveChannel = member.guild.channels.get(server.leaveChannelID);

                    let leaveEmbed = new Discord.RichEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL)
                        .setColor("#ff003d")
                        .setDescription("See you later!")
                        .setFooter(member.guild.name);
                    leaveChannel.send(leaveEmbed);
                }
            });
            Money.findOneAndDelete({userID: member.author.id, serverID: member.guild.id}, function(err) {
                if(err) console.log(err);
            });
            Leveling.findOneAndDelete({userID: member.author.id, serverID: member.guild.id}, function(err) {
                if(err) console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
};