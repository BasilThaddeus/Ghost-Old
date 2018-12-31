const Discord = require("discord.js");
const exec = require("child_process").exec;

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "129649779134300161") return;
    if(args[0] === "update"){
        exec("git pull origin master && killall node && cd Ghost && node app.js", function(err, stdout, stderr){
            console.log(stdout);
        });
        message.reply("Executed.");
    }
};

module.exports.help = {
    name: "dev",
    aliases: [""]
};