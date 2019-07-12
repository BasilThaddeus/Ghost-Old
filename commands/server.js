const Discord = require("discord.js");
const mongoose = require("mongoose");
const Servers = require("../models/server.js");

module.exports.run = async(bot, message, args, prefix) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you do not have permission to change server settings.");
    Servers.findOne({serverID: message.guild.id}, (err, server) => {
        let c1 = `<#${server.joinChannelID}>`;
        let c2 = `<#${server.leaveChannelID}>`;
        if(server.joinChannelID === "0") c1 = "None Channel Assigned";
        if(server.leaveChannelID === "0") c2 = "None Channel Assigned";
        let currentSettingsEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor("#ffffff")
            .setDescription(`***Leveling***\n**levelNotifications** - ${server.levelNotifications}\n**levelType** - ${server.levelType}\n\n***Messages***\n**joinMessages** - ${server.joinMessages}\n**joinChannelID** - ${c1}\n**leaveMessages** - ${server.leaveMessages}\n**leaveChannelID** - ${c2}`)
            .setFooter(message.guild.name);

        let helpEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor("#fff200")
            .setDescription(`**Updating Leveling**\n*Settings: levelNotifications, levelType*\n${prefix}server update [Setting] [true/false/pm/channel]\n\n**Updating Join/Leave Messages**\n*Settings: joinMessages, joinChannelID, leaveMessages, leaveChannelID*\n${prefix}server update [Setting] [true/false/#Channel/ChannelID]`)
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
                        return;
                    }
                    if(args[2].toString().toLowerCase() === "false"){
                        if(server.levelNotifications === false) return message.reply("`levelNotifications` is already disabled.");
                        server.levelNotifications = false;
                        server.save().catch(err => console.log(err));
                        message.reply("`levelNotifications` has successfully been disabled.");
                        return;
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
                        return;
                    }
                    if(args[2].toString().toLowerCase() === "channel"){
                        if(server.levelType === "channel") return message.reply("`levelType` is already on `channel` mode.");
                        server.levelType = "channel";
                        server.save().catch(err => console.log(err));
                        message.reply("`levelType` has successfully been updated to `channel` mode.");
                        return;
                    } else {
                        message.reply("please add either `pm` or `channel` to the command.")
                    }
                }
            }
            if(args[1].toString().toLowerCase() === "joinmessages" || args[1].toString().toLowerCase() === "joinchannelid"){
                if(args[1].toString().toLowerCase() === "joinmessages"){
                    if(args[2].toString().toLowerCase() === "true"){
                        if(server.joinMessages === true) return message.reply("`joinMessages` is already enabled.");
                        server.joinMessages = true;
                        server.save().catch(err => console.log(err));
                        message.reply("`joinMessages` has successfully been enabled.");
                        return;
                    }
                    if(args[2].toString().toLowerCase() === "false"){
                        if(server.joinMessages === false) return message.reply("`joinMessages` is already disabled.");
                        server.joinMessages = false;
                        server.save().catch(err => console.log(err));
                        message.reply("`joinMessages` has successfully been disabled.");
                        return;
                    } else {
                        message.reply("please add either `true` or `false` to the command.");
                    }
                }
                if(args[1].toString().toLowerCase() === "joinchannelid"){
                    let channel = (message.mentions.channels.first() || message.guild.channels.get(args[2]));
                    if(!channel) return message.reply("the specified channel could not be found.");
                    server.joinChannelID = channel.id;
                    server.save().catch(err => console.log(err));
                    message.reply("`joinChannelID` has successfully been set.");
                }
            }
            if(args[1].toString().toLowerCase() === "leavemessages" || args[1].toString().toLowerCase() === "leavechannelid"){
                if(args[1].toString().toLowerCase() === "leavemessages"){
                    if(args[2].toString().toLowerCase() === "true"){
                        if(server.leaveMessages === true) return message.reply("`leaveMessages` is already enabled.");
                        server.leaveMessages = true;
                        server.save().catch(err => console.log(err));
                        message.reply("`leaveMessages` has successfully been enabled.");
                        return;
                    }
                    if(args[2].toString().toLowerCase() === "false"){
                        if(server.leaveMessages === false) return message.reply("`leaveMessages` is already disabled.");
                        server.leaveMessages = false;
                        server.save().catch(err => console.log(err));
                        message.reply("`leaveMessages` has successfully been disabled.");
                        return;
                    } else {
                        message.reply("please add either `true` or `false` to the command.");
                    }
                }
                if(args[1].toString().toLowerCase() === "leavechannelid"){
                    let channel = (message.mentions.channels.first() || message.guild.channels.get(args[2]));
                    if(!channel) return message.reply("the specified channel could not be found.");
                    server.leaveChannelID = channel.id;
                    server.save().catch(err => console.log(err));
                    message.reply("`leaveChannelID` has successfully been set.");
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
    if(args[1].toString().toLowerCase() === "levelnotifications" || args[1].toString().toLowerCase() === "leveltype"){
 */
