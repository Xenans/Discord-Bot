const { TimestampStyles } = require('@discordjs/builders');
const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');
const { Timestamp } = require('mongodb');

module.exports = {
    name: 'garden',
    description: `Usage: \`\`${prefix}garden\`\`
    Grow your own garden! More commands to be added soon.`,
    async execute(message, args, client) {
        const newDocument = {
            userid: message.author.id,
            tags: [],
            balance: 0,
            rate: 0,
            lastUpdated: new Timestamp(),
            lastDaily: new Timestamp(),
            garden: ['🕳️']
            // garden: ['🕳️🕳️', '🕳️🕳️']
        }
        const embed = new Discord.MessageEmbed()
        embed.setTitle(`${message.author.username}'s Garden`)
        // let matches = await mongoClient.db('gardens').collection(message.guild.id).findOneAndReplace({ userid: message.author.id }, newDocument, { upsert: true }).toArray()
        let matches = await mongoClient.db('gardens').collection(message.guild.id).find({ userid: message.author.id }).toArray()

        if (matches.length) {
            updateCurrency(matches[0])
            embed.setDescription(prettifyGarden(matches[0].garden))
        } else {
            await mongoClient.db('gardens').collection(message.guild.id).insertOne(newDocument)
            embed.setDescription(prettifyGarden(newDocument.garden))
        }
        message.channel.send(embed)

    },
};

function updateCurrency(document) {
    currentTime = new Timestamp()
    timeDifference = (currentTime).subtract(document.lastUpdated)
    console.log(timeDifference)
    updatedBalanced = document.balance + document.rate * timeDifference
}

function prettifyGarden(garden) {
    // Dark magicks emoji regex from https://github.com/tc39/proposal-regexp-unicode-property-escapes#matching-emoji
    const regex = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
    height = garden.length
    width = garden[0].match(regex).length

    //String.fromCharCode(97) // Ascii code for a, we can increment up to j: 106
    prettified = ``
    for (let i = 0; i <= width; i++) {
        prettified += emojiDictionary[i]
    }
    for (let i = 0; i < height; i++) {
        character = String.fromCharCode(97 + i)
        prettified += `\n${emojiDictionary[character]}${garden[i]}`
    }

    return prettified
}

let emojiDictionary = {
    '0': '0️⃣',
    '1': '1️⃣',
    '2': '2️⃣',
    '3': '3️⃣',
    '4': '4️⃣',
    '5': '5️⃣',
    '6': '6️⃣',
    '7': '7️⃣',
    '8': '8️⃣',
    '9': '9️⃣',
    '10': '🔟',
    'a': '🇦',
    'b': '🇧',
    'c': '🇨',
    'd': '🇩',
    'e': '🇪',
    'f': '🇫',
    'g': '🇭',
    'h': '🇮',
    'i': '🇮',
    'j': '🇯'
}
//     🌸🌹🌺🌼💐🌻💮🌱🌲🌴🌵🌾🌿☘️🍀🍁🍂🍃🍇🍈🍊🍉🌶🏵🍄🌰🎍🥀🥝🥑🥔🥕🥒🥦