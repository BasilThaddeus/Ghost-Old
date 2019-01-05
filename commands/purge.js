const Discord = require("discord.js");

module.exports.run = async(bot, message, args, prefix) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you do not have permission to manage user messages.");
    if(!args[0] || isNaN(args[0])) return message.reply(`please use the command format: \`${prefix}purge [Number]\``);
    if(args[0] === "0") return message.reply("to delete messages, you need to have a value greater then 0.");
    let mNum = Math.ceil(args[0]);
    if(mNum === 1) mNum = 2;

    let delEmbed = new Discord.RichEmbed()
        .setTitle("🗑 Messages Deleted")
        .setColor("#9f00ff")
        .setDescription(`Deleted ${mNum} messages.`)
        .setFooter(message.guild.name);

    message.delete().then(message.channel.bulkDelete(mNum).then(() => {
        message.channel.send(delEmbed).then(msg => msg.delete(5000));
    }));
};

module.exports.help = {
    name: "purge",
    aliases: ["prune", "delete"]
};

/*

    purge [Amount]

 */