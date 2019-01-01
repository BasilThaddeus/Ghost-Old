const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.reply(`Ghost is on ${bot.guilds.size} servers.`);
};

module.exports.help = {
    name: "server",
    aliases: ["servers"]
};