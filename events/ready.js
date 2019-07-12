const Discord = require("discord.js");
const botConfig = require("../configs/botConfig.json");
const DBL = require("dblapi.js");

module.exports = async(bot) => {
    console.log(`[BOT] Version 1.0.1\n[BOT] Made by BasilT and TheRockstarr33\n[BOT] Running on ${bot.guilds.size} servers\n[BOT] Ready`);

    let i = 0;
    setInterval(function(){
        let status = ["being redeveloped."];
        bot.user.setActivity(status[i]);
        i++;
        if(i === status.length) i = 0;
    }, 30000);

    // DBL
    const dbl = new DBL(botConfig.dbltoken, bot);

    if(bot.user.id !== "528182481946673162") return;
    dbl.on("posted", () => {
        console.log("[APP: DBL] Server Count Posted");
    });
    dbl.on("error", e => {
        console.log(`[APP: DBL] Error: ${e}`);
    });
};
