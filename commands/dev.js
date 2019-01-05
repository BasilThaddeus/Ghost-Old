const Discord = require("discord.js");
const shell = require("shelljs");
const proc = require("process");

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "129649779134300161") return;
    if(args[0] === "update"){
        shell.exec(`cd ~/Ghost/ && git pull origin master && pm2 start app.js`);
        message.reply("executed update.")
    }
    if(args[0] === "eval"){
        let code = args.slice(1).join(" ");
        try {
            let evaled = eval(code);
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
            message.channel.send(`ERROR:\`\`\`xl\n${clean(err)}\n\`\`\``);
        }
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