const Discord = require("discord.js");
const Server = require("../models/server.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

module.exports.run = async(bot, message, args) => {
    Server.findOne({serverID: message.guild.id}, (err, server) => {
        let prefixEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`**Current Prefix**\n${server.prefix}\n**To Set Prefix**\nType ${server.prefix}prefix set [Prefix]\n***Prefixes with spaces will not work***`)
            .setColor("#ffea00")
            .setFooter(message.guild.name);
        if(!args[0] || args[0].toString().toLowerCase() === "help") return message.channel.send(prefixEmbed);
        if(args[0].toString().toLowerCase() === "set"){
            server.prefix = args[1].trim();
            server.save().catch(err => console.log(err));
        }
    });
};

module.exports.help = {
    name: "prefix",
    aliases: ["p"]
};