const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');

module.exports = {
    name: 'delreaction',
    description: `Placeholder text lol`,
    async execute(message, args, client) {
        for (let arg of args) {
            mongoClient.db('reactions').collection(message.guild.id).deleteOne({ key: arg })
            return message.channel.send(`Deleted all reactions for the key "${arg}"`)
        }
    },
};