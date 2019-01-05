const Discord = require("discord.js");
let date = new Date();

module.exports.run = async(bot, message, args, prefix) => {
    if(!args[0]) return message.reply(`please use the command format: \`${prefix}unban [User] [Reason (Optional)]\``);
    let mUser = args[0];
    if(message.guild.member(message.guild.members.get(args[0]))) return message.reply("the specified user is not banned.");

    let bannedUsers = await message.guild.fetchBans();
    if(!bannedUsers.find(t => t.id === mUser)) return message.reply("the specified user is not banned.");

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you do not have permission to ban users.");
    let unbanReason = args.join(" ").slice(22);

    let embed1 = new Discord.RichEmbed()
        .setColor("#ff0043")
        .setDescription(`**❌ Unban**\n${args[0]} has been unbanned`)
        .setFooter(`Unbanned by ${message.author.username}#${message.author.discriminator} | ${date.toLocaleString()}`);

    let embed2 = new Discord.RichEmbed()
        .setColor("#ff0043")
        .setDescription(`**❌ Unban**\n${args[0]} has been unbanned for ${unbanReason}`)
        .setFooter(`Unbanned by ${message.author.username}#${message.author.discriminator} with ID ${message.author.id} | ${date.toLocaleString()}`);

    let respEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("#fdff00")
        .setDescription(`✅ Please type confirm to unban ${args[0]}.\n❎ Type cancel to cancel the unban.`)
        .setFooter(`25 seconds until the ban is automatically canceled.`);

    message.channel.send(respEmbed);

    let modUser = message.author.id;
    const resp = new Discord.MessageCollector(message.channel, message => modUser === message.author.id, {time: 25000});
    resp.on("collect", message => {
        if(message.content.toLowerCase() === "confirm"){
            if(!unbanReason) {
                message.channel.send(embed1);
                message.guild.unban(mUser);
            } else {
                message.channel.send(embed2);
                message.guild.unban(mUser);
            }
        } else if(message.content.toLowerCase() === "cancel") {
            message.reply("the unban has been cancelled.");
        }
    });
};

module.exports.help = {
    name: "unban",
    aliases: []
};