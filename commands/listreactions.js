const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');

module.exports = {
    name: 'listreactions',
    description: `Usage: \`${prefix}listreactions <key>\`
    Lists all reactions in the current server, or if key was provided, all reactions for the given key.`,
    async execute(message, args, client) {
        let key = args[0]
        if (key) {
            let reaction = await mongoClient.db('reactions').collection(message.guild.id).findOne({ key: key })
            console.log(reaction)
            if (reaction) {
                return message.channel.send(reaction.response)
            } else {
                return message.channel.send(`No reactions found for the key ${key}!`)
            }
        } else {
            let reactions = await mongoClient.db('reactions').collection(message.guild.id).find({}).toArray()
            let toSend = []
            for (response of reactions) {
                toSend.push(response.key)
            }
            console.log(toSend)
            if (toSend.length) {
                message.channel.send(toSend)
            } else {
                message.channel.send(`No reactions found for this server!`)
            }
        }

    },
};