const Discord = require("discord.js");
const exec = require("child_process").exec;
const proc = require("process");

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "129649779134300161") return;
    if(args[0] === "update"){
        exec(`cd ~/Ghost/Ghost && git pull origin master && node app.js && sudo kill ${proc.id}`, function(err, stdout, stderr){
            console.log(stdout);
        });
        message.reply("Executed.");
    }
};

module.exports.help = {
    name: "dev",
    aliases: [""]
};