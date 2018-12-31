const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.reply(`Ghost is on ${message.guilds.count} servers.`);
};

module.exports.help = {
    name: "server",
    aliases: ["servers"]
};