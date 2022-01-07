// const { TimestampStyles } = require('@discordjs/builders');
const Discord = require('discord.js');
const { prefix } = require('../config.json');
const mongoClient = require('../helpers/mongoClient.js');

module.exports = {
    name: 'garden',
    description: `Usage: \`\`${prefix}garden\`\`
    Grow your own garden! More commands to be added soon.`,
    async execute(message, args, client) {
        console.log(args)
        if (args.length) {
            // Argument provided, use appropriate command
            const commandName = args[0]
            if (!client.gardenCommands.has(commandName)) return;

            const command = client.gardenCommands.get(commandName);

            try {
                // mongoClient.db('log').collection(message.guild.id).insertOne({ message: message.content })
                command.execute(message, args.slice(1), client);
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
        }
        else {
            // Default to providing a status update on the garden
            // TODO: Check if this is the first time the garden command has been used, and if so explain how to use it
            const newDocument = {
                userid: message.author.id,
                tags: [],
                balance: 0,
                rate: 0.1,
                lastUpdated: new Date(),
                lastDaily: new Date(),
                garden: ['🕳️']
            }
            const embed = new Discord.MessageEmbed()
            embed.setTitle(`${message.author.username}'s Garden`)
            let match = await mongoClient.db('gardens').collection(message.guild.id).findOne({ userid: message.author.id })
            console.log(match)

            if (match) {
                let updatedBalance = await updateCurrency(match, message)
                embed.setDescription(prettifyGarden(match.garden) + updatedBalance.toString())
            } else {
                await mongoClient.db('gardens').collection(message.guild.id).insertOne(newDocument)
                embed.setDescription(prettifyGarden(newDocument.garden))
            }

            console.log(new Date().toString())
            message.channel.send(embed)
        }
    },
};

async function updateCurrency(document, message) {
    const currentTime = new Date()
    const elapsed = (currentTime - document.lastUpdated) / 1000
    console.log(elapsed)
    const updatedBalance = document.balance + document.rate * elapsed
    console.log(document.balance)
    console.log(updatedBalance)
    mongoClient.db('gardens').collection(message.guild.id).updateOne({ userid: message.author.id }, { $set: { lastUpdated: currentTime, balance: updatedBalance } })
    return updatedBalance
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
// 🌸🌹🌺🌼💐🌻💮
// 🌱🌲🌴🌵🌾🌿☘️🍀
// 🍁🍂🍃
// 🍇🍈🍊🍉🌶🏵🍄🌰🎍🥀🥝🥑🥔🥕🥒🥦