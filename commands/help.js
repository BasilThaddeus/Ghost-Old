const Discord = require("discord.js");
const config = require("../configs/botConfig.json");
let prefix = config.prefix;

module.exports.run = async(bot, message, args) => {
    // Embeds
    let embed1 = new Discord.RichEmbed() // Main Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Command Groups")
        .addField("💰 Economy", `*${prefix}help economy*`, true)
        .addField("🛠 Moderation", `*${prefix}help moderation*`, true)
        .addField("🍬 Fun", `*${prefix}help fun*`, true)
        .addField("⚙ Server Settings", `*${prefix}help settings*`, true)
        .setColor("#00f47a")
        .setFooter(message.guild.name);

    let embed2 = new Discord.RichEmbed() // Economy Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Economy")
        .setDescription(`**${prefix}bank** *[User/Deposit/Withdraw] [#/All]* **-** A banking system where you can see others money, deposit, and withdraw money.\n**${prefix}money** *[User]* **-** Checks how many coins a user has`)
        .setColor("#fdff00")
        .setFooter(`Italicized parts are optional arguments | ${message.guild.name}`);

    let embed3 = new Discord.RichEmbed() // Moderation Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Moderation")
        .setDescription(`TO BE ADDED`)
        .setColor("#ff0043")
        .setFooter(`Italicized parts are optional arguments | ${message.guild.name}`);

    let embed4 = new Discord.RichEmbed() // Fun Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Fun")
        .setDescription(`TO BE ADDED`)
        .setColor("#ff00d3")
        .setFooter(`Italicized parts are optional arguments | ${message.guild.name}`);

    let embed5 = new Discord.RichEmbed() // Server Settings Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Server Settings")
        .setDescription(`TO BE ADDED`)
        .setColor("#ffffff")
        .setFooter(`Italicized parts are optional arguments | ${message.guild.name}`);

    let type = args[0].toString().toLowerCase();

    if(!args[0]){
        message.channel.send(embed1);
        return;
    }
    if(type === "economy" || type === "eco"){
        message.channel.send(embed2);
        return;
    }
    if(type === "moderation" || type === "mod"){
        message.channel.send(embed3);
        return;
    }
    if(type === "fun"){
        message.channel.send(embed4);
        return;
    }
    if(type === "settings" || type === "set" || type === "server"){
        message.channel.send(embed5);
    }
};

module.exports.help = {
    name: "help",
    aliases: []
};