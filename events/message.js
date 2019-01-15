const Discord = require("discord.js");
const mongoose = require("mongoose");

const Leveling = require("../models/leveling.js");
const Money = require("../models/money.js");

mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

// Cooldowns
let xpCoolUsers = new Set(); // XP Cooldown Users
let xpCooldown = 5; // XP Cooldown

module.exports = async(bot, message) => {
    if(message.author.bot) return;
    Leveling.findOne({serverID: message.guild.id, userID: message.author.id}, (err, level) => {
        if(err) console.log(err);
        if(!level){
            const newLevels = new Leveling({
                userID: message.author.id,
                serverID: message.guild.id,
                level: 1,
                xp: 0,
            });
            newLevels.save().catch(err => console.log(err));
        }
        if(level){
            let currentXP = level.xp;
            let requiredXP = level.level * 25;

            if(currentXP >= requiredXP){
                level.level = level.level + 1;
                level.xp = level.xp - requiredXP;
                level.save().catch(err => console.log(err));
            }
            level.xp = level.xp + 1;
            level.save().catch(err => console.log(err));
        }
        xpCoolUsers.add(message.author.id);
        setTimeout(() => {
            xpCoolUsers.delete(message.author.id);
        }, xpCooldown * 1000);
    });
    Money.findOne({serverID: message.guild.id, userID: message.author.id}, (err, money) => {
        if(err) console.log(err);
        if(!money){
            const newMoney = new Money({
                userID: message.author.id,
                money: 20,
                bank: 0,
                bankMax: 250,
            });
            newMoney.save().catch(err => console.log(err));
        }
    });
};
