const Discord = require("discord.js");
const version = require("../configs/botConfig.json").version;

module.exports.run = async(bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("Bot")
        .setColor("#21ff00")
        .setURL("https://discordapp.com/api/oauth2/authorize?client_id=528182481946673162&permissions=8&scope=bot")
        .setDescription(`**Created By**\nBasilT#6969\n**Version**\n${version}\n**Support Server**\nhttps://discord.gg/FwzbZ8E`)
        .setFooter(message.guild.name);
    message.channel.send(embed);
};

module.exports.help = {
    name: "botinfo",
    aliases: []
};