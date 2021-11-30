const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');

module.exports = {
    name: 'delreaction',
    description: `Usage: \`${prefix}delreaction [key]\`
    Deletes all reactions for a given key.`,
    async execute(message, args, client) {
        for (let arg of args) {
            mongoClient.db('reactions').collection(message.guild.id).deleteOne({ key: arg })
            return message.channel.send(`Deleted all reactions for the key "${arg}"`)
        }
    },
};