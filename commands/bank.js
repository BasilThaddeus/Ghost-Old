const Discord = require("discord.js");
const mongoose = require("mongoose");

const Money = require("../models/money.js");

mongoose.connect("mongodb://localhost:27017/Servers", {
    useNewUrlParser: true
});

module.exports.run = async(bot, message, args) => {
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let mName;
    if(mUser) {
        if(mUser.user.bot) return message.reply("you cannot check the balance of a bot.");
        mName = mUser.user.username;
        mUser = mUser.id;
    }
    if(!args[0]){
        mUser = message.author.id;
        mName = message.author.username;
    }
    Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
        let bankEmbed = new Discord.RichEmbed()
            .setTitle(`${mName}'s Bank Balance`)
            .setColor("#42ff00")
            .setDescription(`**💸 Money**\n${money.bank} coins`)
            .setFooter(message.guild.name);

        if(!args[0] && !args[1]) {
            if (!mUser) return message.reply("this user does not exist. Please try again by mentioning them (@).");
            return message.channel.send(bankEmbed);
        }

        let type = args[0].toString().toLowerCase();

        if(err) console.log(err);
        if(type === "deposit" || type === "dep" || type === "d") {
            if (money.bank === money.bankMax) return message.reply(`your bank is full.`);
            if (!isNaN(args[1])) {
                let deposit = Math.floor(args[1]);
                if(args[1] < 0) return message.reply("you cannot deposit coins under 0");
                if (args[1] > money.money) return message.reply(`you do not have ${args[1]} coins.`);
                if (args[1] > money.bankMax) return message.reply(`you can only deposit ${money.bankMax - money.bank} currently.`);
                if(deposit > money.bankMax - money.bank) {
                    let deposit = money.bankMax - money.bank;
                    if (deposit === 1) message.reply(`${deposit} coin has been deposited into your bank account.`);
                    if (deposit > 1) message.reply(`${deposit} coins have been deposited into your bank account.`);
                }
                if(deposit <= money.bankMax - money.bank){
                    let deposit = Math.floor(args[1]);
                    if(deposit === 1) message.reply(`${deposit} coin has been deposited into your bank account.`);
                    if(deposit > 1 ) message.reply(`${deposit} coins have been deposited into your bank account.`);
                }
                if(deposit <= money.bankMax - money.bank) {
                    money.money = money.money - deposit;
                    money.bank = money.bank + deposit;
                    money.save().catch(err => console.log(err));
                } else {
                    money.money = money.money - (money.bankMax - money.bank);
                    money.bank = money.bank + (money.bankMax - money.bank);
                    money.save().catch(err => console.log(err));
                }
            }
            if (args[1].toString().toLowerCase() === "all") {
                let deposit = Math.floor(money.money);
                if (deposit === 0) return message.reply("you need to have more then 0 coins to deposit.");
                if (deposit > (money.bankMax - money.bank) && deposit > 1) message.reply(`${money.bankMax - money.bank} coins have been deposited into your bank account.`);
                if (deposit < (money.bankMax - money.bank) && deposit > 1) message.reply(`${deposit} coins have been deposited into your bank account.`);
                if (deposit > (money.bankMax - money.bank) && deposit === 1) message.reply(`${money.bankMax - money.bank} coins has been deposited into your bank account.`);
                if (deposit < (money.bankMax - money.bank) && deposit === 1) message.reply(`${deposit} coin has been deposited into your bank account.`);
                money.money = money.money - (money.bankMax - money.bank);
                money.bank = money.bank + (money.bankMax - money.bank);
                money.save().catch(err => console.log(err));
            }
        }
        if(type === "withdraw" || type === "with" || type === "w") {
            if(!isNaN(args[1])) {
                let withdrawAmount = Math.floor(args[1]);
                if(args[1] < 0) return message.reply("you cannot deposit coins under 0");
                if (money.bank === 0 || withdrawAmount === 0) return message.reply("you do not have any coins to withdraw.");
                if (withdrawAmount > money.bank && money.bank === 1) {
                    if (withdrawAmount > money.bank) return message.reply(`you only have ${money.bank} coin to withdraw.`);
                }
                if (withdrawAmount > money.bank && money.bank > 1) {
                    if (withdrawAmount > money.bank) return message.reply(`you only have ${money.bank} coins to withdraw.`);
                }

                if(withdrawAmount > 1) message.reply(`${withdrawAmount} coins have been withdrawn from your bank account.`);
                if(withdrawAmount === 1) message.reply(`${withdrawAmount} coin has been withdrawn from your bank account.`);

                money.money = money.money + withdrawAmount;
                money.bank = money.bank - withdrawAmount;
                money.save().catch(err => console.log(err));
            }
            if(args[1] === "all"){
                let withdrawAmount = money.bank;
                if(withdrawAmount === 0) return message.reply("you do not have any coins to withdraw.");
                if(withdrawAmount === 1) message.reply(`${withdrawAmount} coin has been withdrawn from your bank account.`);
                if(withdrawAmount > 1) message.reply(`${withdrawAmount} coins have been withdrawn from your bank account.`);

                money.money = money.money + money.bank;
                money.bank = 0;
                money.save().catch(err => console.log(err));
            }
        }
    });
};

module.exports.help = {
    name: "bank",
    aliases: ["b"]
};

/* Formats and Usages
*
* bank [deposit/withdraw] [all/#]
*
* */