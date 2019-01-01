const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});
const Leveling = require("../models/leveling.js");

module.exports.run = async(bot, message, args) => {
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let mName;
    if(mUser) {
        if(mUser.user.bot) return message.reply("you cannot check the level of a bot.");
        mName = mUser.user.username;
        mUser = mUser.id;
    }
    if(!args[0]){
        mName = message.author.username;
        mUser = message.author.id;
    }
    if(!mUser) return message.reply("this user does not exist. Please try again by mentioning them (@).");

    Leveling.findOne({userID: mUser, serverID: message.guild.id}, (err, level) => {
        if(err) console.log(err);
        let levels = level.level;
        let xp = level.xp;

        let embed = new Discord.RichEmbed()
            .setTitle(`${mName}'s Levels`)
            .setColor("#00ff16")
            .setDescription(`**⬆ Levels**\nLevel ${levels}\nXP ${xp}`)
            .setFooter(message.guild.name);
        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "level",
    aliases: ["xp", "l", "levels"]
};