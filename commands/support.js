const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Support Server")
        .setDescription("Need help for Ghost bot? Join our support server!")
        .setURL("https://discord.gg/FwzbZ8E")
        .setFooter(message.guild.name);
    message.channel.send(embed);
};

module.exports.help = {
    name: "support",
    aliases: []
};