const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Ghost Bot")
        .setDescription("**Voting**\nVoting rewards 100 coins to your balance.")
        .setFooter(message.guild.name)
        .setURL("https://discordbots.org/bot/528182481946673162/vote");
    message.channel.send(embed);
};

module.exports.help = {
    name: "vote",
    aliases: ["votes"]
};