const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');

module.exports = {
    name: 'addreaction',
    description: `Usage: \`\`${prefix}addreaction [key] \`[response]\` \`\`
    Adds an automatic response to the bot. Every time the key is detected in a message, the bot will repond with \`[response]\`.`,
    async execute(message, args, client) {
        let reactionResponse = message.content.match(/`([\s\S]+)`/)
        console.log(reactionResponse)
        reactionKey = args[0]
        if (args.length <= 1 || !reactionResponse) {
            console.log(`response is supposedly "${reactionResponse}"`)
            message.reply(`please provide valid arguments!`)
            return
        }
        console.log(`Adding reaction for '${reactionKey}'`)

        let match = await mongoClient.db('reactions').collection(message.guild.id).findOne({ key: reactionKey.toLowerCase() })
        console.log(match)
        if (match) {
            let existing = match.response
            existing.push(reactionResponse[1])
            await mongoClient.db('reactions').collection(message.guild.id).updateOne({ key: reactionKey.toLowerCase() }, { $set: { response: existing } })
            return message.channel.send(`Updated reactions for the key "${reactionKey}"`)
        } else {
            await mongoClient.db('reactions').collection(message.guild.id).insertOne({ key: reactionKey.toLowerCase(), response: [reactionResponse[1]] })
            return message.channel.send(`Added reaction for the key "${reactionKey}"`)
        }
    },
};