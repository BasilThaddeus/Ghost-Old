const Discord = require("discord.js");
let prefix = require("../configs/botConfig.json").prefix;
let owner = require("../configs/botConfig.json").owner;
let date = new Date();

module.exports.run = async(bot, message, args) => {
    if(!args[0]) return message.reply(`please use the command format: \`${prefix}ban [User] [Reason (Optional)]\``);
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!mUser) return message.reply("user was not found.");
    if(mUser.user.id === owner) return;
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you do not have permission to ban users.");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.reply("the specified user cannot be banned.");
    let banReason = args.join(" ").slice(22);

    let embed1 = new Discord.RichEmbed()
        .setAuthor(mUser.user.username, mUser.user.displayAvatarURL)
        .setColor("#ff0043")
        .setDescription(`**🔨 Ban**\n${mUser.user.username} has been banned`)
        .setFooter(`Banned by ${message.author.username}#${message.author.discriminator} | ${date.toLocaleString()}`);

    let embed2 = new Discord.RichEmbed()
        .setAuthor(mUser.user.username, mUser.user.displayAvatarURL)
        .setColor("#ff0043")
        .setDescription(`**🔨 Ban**\n${mUser.user.username} has been banned for ${banReason}`)
        .setFooter(`Banned by ${message.author.username}#${message.author.discriminator} with ID ${message.author.id} | ${date.toLocaleString()}`);

    let respEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("#fdff00")
        .setDescription(`✅ Please type confirm to ban ${mUser.user.username}.\n❎ Type cancel to cancel the ban.`)
        .setFooter(`25 seconds until the ban is automatically canceled.`);

    message.channel.send(respEmbed);

    let modUser = message.author.id;
    const resp = new Discord.MessageCollector(message.channel, message => modUser === message.author.id, {time: 25000});
    resp.on("collect", message => {
        if(message.content.toLowerCase() === "confirm"){
            if(!banReason) {
                message.channel.send(embed1);
                message.guild.member(mUser).ban();
            } else {
                message.channel.send(embed2);
                message.guild.member(mUser).ban(banReason);
            }
        } else if(message.content.toLowerCase() === "cancel") {
            message.reply("the ban has been cancelled.");
        }
    });
};

module.exports.help = {
	name: "ban",
	aliases: []
};