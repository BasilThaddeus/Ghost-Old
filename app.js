// Ghost Mod Bot
// by BasilT
// Version 1.0.0

// Requirements
const Discord = require("discord.js");
const fs = require("fs");
const { promisify } = require("util");
const mongoose = require("mongoose");
const DBL = require("dblapi.js");

// Developers
const developers = ["129649779134300161", "395236087364190218"];

// Config Imports
const botConfig = require("./configs/botConfig.json");

// Other
const bot = new Discord.Client();
const readdir = promisify(fs.readdir);
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
let date = new Date();
const dbl = new DBL(botConfig.dbltoken, bot);

// Cooldowns
let xpCooldown = new Set(); // XP
let cCooldown = new Set();// Commands
let cSpamCooldown = new Set(); // 2nd Command Cooldown
let cooldownSec = 10; // XP Cooldown
let commandSec = 5; // Command Cooldown

// Mongoose
mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

// Mongoose Models
const Leveling = require("./models/leveling.js");
const Money = require("./models/money.js");
const Server = require("./models/server.js");

// DBL
dbl.on("posted", () => {
    console.log("[APP: DBL] Server Count Posted");
});
dbl.on("error", e => {
    console.log(`[APP: DBL] Error: ${e}`);
});

const load = async () => {
    readdir("./commands/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if(jsfile.length <= 0){
            console.log(`[APP] No Commands Found`);
            return;
        }
        jsfile.forEach((f, i) =>{
            let props = require(`./commands/${f}`);
            console.log(`[APP: CMD] ${f}`);
            bot.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias =>{
               bot.aliases.set(alias, props.help.name);
            });
        });
    });
    readdir("./events/", (err, files) => {
        if(err) console.log(err);
        let eventfiles = files.filter(f => f.split(".").pop() === "js");
        if(eventfiles.length <= 0){
            console.log(`[APP] No Events Found`);
            return;
        }
        eventfiles.forEach((f, i) =>{
            let eventName = f.split(".")[0];
            let event = require(`./events/${f}`);
            bot.on(eventName, event.bind(null,bot));
            console.log(`[APP: EVT] ${f}`);
            delete require.cache[require.resolve(`./events/${f}`)];
        });
    });
};
bot.on("message", async message => {
    // Embeds
    let cooldownEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("#f40600")
        .setDescription(`**Your commands are on cooldown!**\nPlease wait the *${commandSec} second* cooldown before using another command.`)
        .setFooter(date.toLocaleString());

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return message.reply(`Please use a Discord server which I am in.`);
    Server.findOne({serverID: message.guild.id}, (err, server) => {
        if(err) console.log(err);
        if(!server){
            const newServer = new Server({
                serverID: message.guild.id,
                levelNotifications: true,
                levelType: "channel",
                joinMessages: false,
                joinChannelID: 0,
                leaveMessages: false,
                leaveChannelID: 0,
                prefix: "!",
            });
            newServer.save().catch(err => console.log(err));
        }
        if(!server.prefix){
            server.prefix = "!";
            server.save().catch(err => console.log(err));
        }

        let content = message.content.split(" ");
        let command = content[0].toLowerCase();
        let prefix = server.prefix;
        let args = content.slice(prefix.length);
        let cmdFile = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));

        if(message.content.toLowerCase().startsWith(prefix)){
            if(!cmdFile) return;
            if(!developers.includes(message.author.id)) {
                if (cSpamCooldown.has(message.author.id)) return;
                if (cCooldown.has(message.author.id)) {
                    cSpamCooldown.add(message.author.id);
                    return message.channel.send(cooldownEmbed);
                }
                cCooldown.add(message.author.id);
                setTimeout(() => {
                    cCooldown.delete(message.author.id);
                    cSpamCooldown.delete(message.author.id);
                }, commandSec * 1000);
            }
            cmdFile.run(bot, message, args, prefix);
        } else {
            Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
                if(err) console.log(err);
                if(!money){
                    const newMoney = new Money({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        money: 25,
                        bank: 0,
                        bankMax: 200
                    });
                    newMoney.save().catch(err => console.log(err));
                }
            });

            if(xpCooldown.has(message.author.id)) return;
            Leveling.findOne({userID: message.author.id, serverID: message.guild.id}, (err, level) => {
                if(err) console.log(err);
                if(!level){
                    const newLevel = new Leveling({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        level: 1,
                        xp: 0
                    });
                    newLevel.save().catch(err => console.log(err));
                } else {
                    if((level.level * 50)/level.xp !== 1){
                        level.xp = level.xp + 5;
                        level.save().catch(err => console.log(err));
                        return;
                    }
                    if((level.level * 50)/level.xp >= 1){
                        level.level = level.level + 1;
                        level.xp = 0;
                        level.save().catch(err => console.log(err));
                        let levelUP = new Discord.RichEmbed()
                            .setAuthor(message.author.username, message.author.displayAvatarURL)
                            .setColor("#f400b4")
                            .setDescription(`**🆙 Level Up!**\nCongratulations ${message.author.username}! You are now level ${level.level}.`)
                            .setFooter(message.guild.name);

                        Server.findOne({serverID: message.guild.id}, (err, server) => {
                            if(err) console.log(err);
                            if(server.levelNotifications === false) return;
                            if(server.levelNotifications){
                                if(server.levelType === "pm") return message.author.send(levelUP);
                                if(server.levelType === "channel") return message.channel.send(levelUP);
                            }
                        });
                    }
                }
            });
            xpCooldown.add(message.author.id);
            setTimeout(() => {
                xpCooldown.delete(message.author.id);
            }, cooldownSec * 1000);
        }
    });
});

bot.login(botConfig.token);
load();