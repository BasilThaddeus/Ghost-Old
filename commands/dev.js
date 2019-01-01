const Discord = require("discord.js");
const shell = require("shelljs");
const proc = require("process");

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "129649779134300161") return;
    if(args[0] === "update"){
        shell.exec(`cd ~/Ghost/ && git pull origin master && node app.js && kill ${proc.id}`);
        message.reply("executed update.")
    }
};

module.exports.help = {
    name: "dev",
    aliases: []
};

/*

'cd ~/Ghost/',
'git pull origin master',
'node app.js',
`kill ${proc.id}`

 */