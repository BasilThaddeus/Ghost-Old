const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Players", {
    useNewUrlParser: true
});
const Leveling = require("../models/leveling.js");

module.exports.run = async(bot, message, args) => {
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(mUser) mUser = mUser.id;
    if(!args[0]){
        mUser = message.author.id;
    }
    if(!mUser) return message.reply("this user does not exist. Please try again by mentioning them (@).");

    Leveling.findOne({userID: mUser, serverID: message.guild.id}, (err, level) => {
        if(err) console.log(err);
        let levels = level.level;
        let xp = level.xp;

        let embed = new Discord.RichEmbed()
            .setColor("#00ff16")
            .setDescription(`**⬆ Levels**\nLevel ${levels}\nXP ${xp}`)
            .setFooter(message.guild.name);
        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "level",
    aliases: ["xp", "l"]
};