const Discord = require("discord.js");
const mongoose = require("mongoose");
const Jimp = require("jimp");

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

    Leveling.findOne({serverID: message.guild.id, userID: mUser}, (err, level) => {
        new Jimp(275, 125, "#404040", (err, image) => {
            image.blur(10);

            Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
                image.print(font, 10, 45, message.guild.name);
                image.print(font, 10, 75, "Level " + level.level);
                image.print(font, 10, 95, "XP " + level.xp);
                Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
                    image.print(font, 10, 10, mName);
                    image.print(font, 0, 35, "________________");
                    let file = "./images/" + message.author.id + ".png";
                    image.write(file);
                    message.channel.send({file: file});
                });
            });
        });
    });
};

module.exports.help = {
    name: "level",
    aliases: ["xp", "l", "levels"]
};