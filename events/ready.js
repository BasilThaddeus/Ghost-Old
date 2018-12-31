const Discord = require("discord.js");

module.exports = async(bot) => {
    console.log(`[BOT] Version 1.0.0\n[BOT] Made by BasilT\n[BOT] Running on ${bot.guilds.size} servers\n[BOT] Ready`);

    let status = ["!help", `on ${bot.guilds.size} servers`];
    let i = 0;

    setInterval(function(){
        bot.user.setActivity(status[i]);
        i++;
        if(i === status.length) i = 0;
    }, 30000);
};