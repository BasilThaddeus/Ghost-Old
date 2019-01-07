// Ghost Bot
// by BasilT and TheRockstarr33
// Version 1.0.1

// Requirements
const Discord = require("discord.js");
const fs = require("fs");
const { promisify } = require("util");
const mongoose = require("mongoose");

// Developer ID's
const developers = ["129649779134300161", "416847732737835008"];

// Configs
const botConfig = require("./configs/botConfig.json");

// Other
const bot = new Discord.Client();
const readdir = promisify(fs.readdir);
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

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
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return message.reply(`Please join the support server or use my commands in a channel which I am in.\nhttps://discord.gg/FwzbZ8E`);

    // Cooldowns
    let cCoolUsers = new Set(); // Command Cooldown Users
    let cCooldown = 5; // Command Cooldown

    let spamCUsers = new Set();

    let content = message.content.split(" ");
    let command = content[0].toLowerCase();
    let prefix = "!";
    let args = content.slice(prefix.length);
    let cmdFile = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));

    if(message.content.toLowerCase().startsWith(prefix)){
        if(cmdFile){
            if(developers.includes(message.author.id)) return cmdFile.run(bot, message, args, prefix);
            if(cCoolUsers.has(message.author.id)){
                message.reply("please wait the **5 second cooldown** before using another command.");
                spamCUsers.add(message.author.id);
                return;
            }
            if(spamCUsers.has(message.author.id)) return;
            cmdFile.run(bot, message, args, prefix);
            cCoolUsers.add(message.author.id);
            setTimeout(() => {
                cCoolUsers.delete(message.author.id);
                spamCUsers.delete(message.author.id);
            }, cCooldown * 1000);
        }
    }
});

bot.login(botConfig.token);
load();