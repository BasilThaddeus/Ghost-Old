const Discord = require("discord.js");
const config = require("../configs/botConfig.json");
let p = config.prefix;

module.exports.run = async(bot, message, args) => {
    // Embeds
    let embed1 = new Discord.RichEmbed() // Main Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Command Groups")
        .addField("💰 Economy", `*${p}help economy*`, true)
        .addField("🛠 Moderation", `*${p}help moderation*`, true)
        .addField("🍬 Fun", `*${p}help fun*`, true)
        .addField("⚙ Server Settings", `*${p}help settings*`, true)
        .setColor("#00f47a")
        .setFooter(message.guild.name);

    let embed2 = new Discord.RichEmbed() // Economy Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Economy")
        .setDescription(`**${p}bank** *[@User/UserID/Deposit/Withdraw] [#/All]* **-** A banking system where you can see others money, deposit, and withdraw money.\n**${p}money** *[@User/UserID]* **-** Checks the balance of a user.`)
        .setColor("#fdff00")
        .setFooter(`Italicized parts are optional arguments | ${message.guild.name}`);

    let embed3 = new Discord.RichEmbed() // Moderation Embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Moderation")
        .setDescription(`**${p}ban** [@User/UserID] *[Reason]* **-** Ban a user for an optional reason.\n**${p}unban** [UserID] *[Reason]* **-** Unban a user for an optional reason.\n**${p}kick** [@User/UserID] *[Reason]* **-** Kicks a user for an optional reason.\n**${p}purge** [Amount] **-** Clears chat for up to 100 messages.`)
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
        .setDescription(`**${p}server** *[Help/Update] [Setting] [True/False/Channel/Pm/ID's]* **-** A way to enable/disable different bot settings for your server.`)
        .setColor("#ffffff")
        .setFooter(`Italicized parts are optional arguments | ${message.guild.name}`);

    if(!args[0]){
        message.channel.send(embed1);
        return;
    }

    let type = args[0].toString().toLowerCase();
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