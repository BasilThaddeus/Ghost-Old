const Discord = require("discord.js");
let prefix = require("../configs/botConfig.json").prefix;
let owner = require("../configs/botConfig.json").owner;
let date = new Date();

module.exports.run = async(bot, message, args) => {
    if(!args[0]) return message.reply(`please use the command format: \`${prefix}kick [User] [Reason (Optional)]\``);
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!mUser) return message.reply("user was not found.");
    if(mUser.user.id === owner) return;
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("you do not have permission to kick users.");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.reply("the specified user cannot be kicked.");
    let kickReason = args.join(" ").slice(22);

    let embed1 = new Discord.RichEmbed()
        .setAuthor(mUser.user.username, mUser.user.displayAvatarURL)
        .setColor("#ff0043")
        .setDescription(`**👢 Kick**\n${mUser.user.username} has been kick`)
        .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator} | ${date.toLocaleString()}`);

    let embed2 = new Discord.RichEmbed()
        .setAuthor(mUser.user.username, mUser.user.displayAvatarURL)
        .setColor("#ff0043")
        .setDescription(`**👢 Kick**\n${mUser.user.username} has been kicked for ${kickReason}`)
        .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator} with ID ${message.author.id} | ${date.toLocaleString()}`);

    let respEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("#fdff00")
        .setDescription(`✅ Please type confirm to kick ${mUser.user.username}.\n❎ Type cancel to cancel the kick.`)
        .setFooter(`25 seconds until the kick is automatically canceled.`);

    message.channel.send(respEmbed);

    let modUser = message.author.id;
    const resp = new Discord.MessageCollector(message.channel, message => modUser === message.author.id, {time: 25000});
    resp.on("collect", message => {
        if(message.content.toLowerCase() === "confirm"){
            if(!kickReason) {
                message.channel.send(embed1);
                mUser.kick();
            } else {
                message.channel.send(embed2);
                mUser.kick(kickReason);
            }
        } else if(message.content.toLowerCase() === "cancel") {
            message.reply("the kick has been cancelled.");
        }
    });
};

module.exports.help = {
    name: "kick",
    aliases: []
};