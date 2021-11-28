const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');

module.exports = {
    name: 'addreaction',
    description: `Placeholder text lol, wrap the response in \\\`backticks\\\``,
    async execute(message, args, client) {
        let reactionResponse = message.content.match(/`.+`/)[0]
        reactionKey = args[0]
        if (args.length <= 1 || !reactionResponse) {
            console.log(`response is supposedly "${reactionResponse}"`)
            message.reply(`please provide valid arguments!`)
            return
        }
        console.log(`Adding reaction for '${reactionKey}'`)

        let matches = await mongoClient.db('reactions').collection(message.guild.id).find({ key: reactionKey }).toArray()
        console.log(matches)
        if (matches) {
            let match = matches[0]
            let existing = match.response
            existing.push(reactionResponse)
            await mongoClient.db('reactions').collection(message.guild.id).updateOne({ key: reactionKey }, { $set: { response: existing } })
            return message.channel.send(`Updated reactions for the key "${reactionKey}"`)
        } else {
            await mongoClient.db('reactions').collection(message.guild.id).insertOne({ key: reactionKey, response: [reactionResponse] })
            return message.channel.send(`Added reaction for the key "${reactionKey}"`)
        }
    },
};