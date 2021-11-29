const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');
const utils = require('../helpers/utils.js')


module.exports.checkReactions = async function (message) {
    // Identify server that the message is was read from
    // Read from list of all existing reaction keys
    // Respond
    // console.log(message.content)
    // console.log(message.guild.id)

    let doesMatch = await mongoClient.db('reactions').listCollections({ name: message.guild.id }).toArray()
    if (doesMatch.length) {
        keys = await mongoClient.db('reactions').collection(message.guild.id).find({}).toArray()
        for (document of keys) {
            key = document.key
            let words = message.content.toLowerCase().split(/ +/)
            if (words.includes(key)) {
                message.channel.send(utils.chooseRandom(document.response))
            }
        }
        return
    } else {
    }
}