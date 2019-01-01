const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.reply("test file, successfully run!");
};

module.exports.help = {
    name: "test"
};