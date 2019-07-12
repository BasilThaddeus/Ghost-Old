const Discord = require("discord.js");
const mongoose = require("mongoose");
const Money = require("../models/money.js");

module.exports.run = async(bot, message, args) => {
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let mName;
    if(mUser) {
        if(mUser.user.bot) return message.reply("you cannot check the balance of a bot.");
        mName = mUser.user.username;
        mUser = mUser.id;
    }
    if(!args[0]){
        mName = message.author.username;
        mUser = message.author.id;
    }
    if(!mUser) return message.reply("this user does not exist. Please try again by mentioning them (@).");

    Money.findOne({userID: mUser, serverID: message.guild.id}, (err, money) => {
        if(err) console.log(err);
        let uMoney = money.money;

        let embed = new Discord.RichEmbed()
            .setTitle(`${mName}'s Balance`)
            .setColor("#00ff16")
            .setDescription(`**💰 Money**\n${uMoney} coins`)
            .setFooter(message.guild.name);
        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "money",
    aliases: ["bal", "balance", "m"]
};