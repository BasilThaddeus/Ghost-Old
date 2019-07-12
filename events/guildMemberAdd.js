const Discord = require("discord.js");
const mongoose = require("mongoose");
const Money = require("../models/money.js");
const Leveling = require("../models/leveling.js");
const Server = require("../models/server.js");

module.exports = async(bot, member) => {
    try {
        Server.findOne({serverID: member.guild.id}, (err, server) =>{
            if(server.joinMessages === true) {
                if (server.joinChannelID === "0") return;
                let welcomeChannel = member.guild.channels.get(server.joinChannelID);

                let welcomeEmbed = new Discord.RichEmbed()
                    .setAuthor(member.user.username, member.user.displayAvatarURL)
                    .setColor("#0cff00")
                    .setDescription("Welcome to the server!")
                    .setFooter(member.guild.name);
                welcomeChannel.send(welcomeEmbed);
            }
        });
        Money.findOne({serverID: member.guild.id, userID: member.author.id}, (err, money) => {
            if(err) console.log(err);
            if(!money){
                const newMoney = new Money({
                    userID: member.author.id,
                    money: 20,
                    bank: 0,
                    bankMax: 250,
                });
                newMoney.save().catch(err => console.log(err));
            }
        });
        Leveling.findOne({serverID: member.guild.id, userID: member.author.id}, (err, level) => {
            if (err) console.log(err);
            if (!level) {
                const newLevels = new Leveling({
                    userID: member.author.id,
                    serverID: member.guild.id,
                    level: 1,
                    xp: 0,
                });
                newLevels.save().catch(err => console.log(err));
            }
        });
    } catch (err) {
        console.log(err);
    }
};