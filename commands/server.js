const Discord = require("discord.js");
const mongoose = require("mongoose");
const Servers = require("../models/server.js");

let prefix = require("../configs/botConfig.json").prefix;

mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

module.exports.run = async(bot, message, args) => {
    Servers.findOne({serverID: message.guild.id}, (err, server) => {
        let currentSettingsEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor("#ffffff")
            .setDescription(`***Leveling***\n**levelNotifications** - ${server.levelNotifications}\n**levelType** - ${server.levelType}`)
            .setFooter(message.guild.name);

        let helpEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor("#fff200")
            .setDescription(`**Updating Leveling**\n*Settings: levelNotifications, levelType*\n${prefix}server update [Setting] [true/false/pm/channel]`)
            .setFooter(message.guild.name);

        if(!args[0]){
            message.channel.send(currentSettingsEmbed);
            return;
        }
        let type = args[0].toString().toLowerCase();
        if(type === "help"){
            message.channel.send(helpEmbed);
            return;
        }
        if(type === "update"){
            if(args[1].toString().toLowerCase() === "levelnotifications" || args[1].toString().toLowerCase() === "leveltype"){
                if(!args[2] && args[1].toString().toLowerCase() === "levelnotifications") return message.reply("please add the last argument of `[true/false]`");
                if(!args[2] && args[1].toString().toLowerCase() === "leveltype") return message.reply("please add the last argument of `[pm/channel]`");
                if(args[1].toString().toLowerCase() === "levelnotifications"){
                    if(args[2].toString().toLowerCase() === "true"){
                        if(server.levelNotifications === true) return message.reply("`levelNotifications` is already enabled.");
                        server.levelNotifications = true;
                        server.save().catch(err => console.log(err));
                        message.reply("`levelNotifications` has successfully been enabled.");
                    }
                    if(args[2].toString().toLowerCase() === "false"){
                        if(server.levelNotifications === false) return message.reply("`levelNotifications` is already disabled.");
                        server.levelNotifications = false;
                        server.save().catch(err => console.log(err));
                        message.reply("`levelNotifications` has successfully been disabled.");
                    } else {
                        message.reply("please add either `true` or `false` to the command.");
                    }
                }
                if(args[1].toString().toLowerCase() === "leveltype"){
                    if(args[2].toString().toLowerCase() === "pm"){
                        if(server.levelType === "pm") return message.reply("`levelType` is already on `pm` mode.");
                        server.levelType = "pm";
                        server.save().catch(err => console.log(err));
                        message.reply("`levelType` has successfully been updated to `pm` mode.");
                    }
                    if(args[2].toString().toLowerCase() === "channel"){
                        if(server.levelType === "channel") return message.reply("`levelType` is already on `channel` mode.");
                        server.levelType = "channel";
                        server.save().catch(err => console.log(err));
                        message.reply("`levelType` has successfully been updated to `channel` mode.");
                    } else {
                        message.reply("please add either `pm` or `channel` to the command.")
                    }
                }
            }
        }
    });
};

module.exports.help = {
    name: "server",
    aliases: ["s", "settings", "setting"]
};
/*

    server [help/update] [setting] [true/false/channel/pm]

 */