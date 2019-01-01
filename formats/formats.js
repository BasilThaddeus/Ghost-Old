// All formats that are needed (IE RichEmbeds)

// Rich Embed
let embed = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL)
.setColor("#000000")
.setDescription("Description")
.setFooter(message.guild.name);

// Command Template
const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
	
};

module.exports.help = {
	name: "name",
	aliases: []
};

//