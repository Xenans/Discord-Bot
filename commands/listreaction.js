const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');

module.exports = {
    name: 'listreaction',
    description: `Placeholder text lol`,
    async execute(message, args, client) {
        let key = args[0]
        let responses = await mongoClient.db('reactions').collection(message.guild.id).find({ key: key }).toArray()
        console.log(responses)
        if (responses.length) {
            return message.channel.send(responses[0].response)
        } else {
            return message.channel.send(`No reactions found for the key ${key}!`)
        }
    },
};