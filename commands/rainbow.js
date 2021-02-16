const Discord = require('discord.js');
const {prefix} = require('../config.json');
module.exports = {
	name: 'rainbow',
    description: `Usage: \`${prefix}rainbow\`\n
    Find the embed color of your dreams!`,
	execute(message, args, client) {
        color = [127, 127, 127]
        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Taste the Rainbow')
        .setDescription('Currently Loading...')

        message.channel.send(embed)
        .then(async function (embedmsg) {
            await embedmsg.react('⏪')
            await embedmsg.react('⬅️')
            await embedmsg.react('🟥')
            await embedmsg.react('🟩')
            await embedmsg.react('🟦')
            await embedmsg.react('➡️')
            await embedmsg.react('⏩')
            await embedmsg.react('⬆️')
            await embedmsg.react('⬇️')
            increment = 5
            editing = ['-','-','-']
            embed.setDescription(`Currently incrementing \`${editing}\` by ${increment}\n
            ${color}\n
            🟥🟩🟦 Choose color\n
            ⏪⬅️➡️⏩ Adjust increment\n
            ⬆️⬇️ Apply increment`)
            await embedmsg.edit(embed)



            // Set a filter to ONLY grab those reactions & discard the reactions from the bot
            const filter = (reaction, user) => {
                return ['⏪', '⬅️','🟥','🟩','🟦','➡️','⏩','⬆️','⬇️'].includes(reaction.emoji.name) && user.id === message.author.id && !user.bot;
            };
            const time = 60000 // time to collect for in ms
            const collector = embedmsg.createReactionCollector(filter, { time: time });
            collector.on('collect', (reaction) => {
                if (reaction.emoji.name === '🟥') {
                    if (editing[0] === '-') {
                        editing[0] = 'R'
                    } else {
                        editing[0] = '-'
                    }
                } else if (reaction.emoji.name === '🟩') {
                    if (editing[1] === '-') {
                        editing[1] = 'G'
                    } else {
                        editing[1] = '-'
                    }
                } else if (reaction.emoji.name === '🟦') {
                    if (editing[2] === '-') {
                        editing[2] = 'B'
                    } else {
                        editing[2] = '-'
                    }
                } else if (reaction.emoji.name === '⏪') {
                    increment -= 5
                } else if (reaction.emoji.name === '⬅️') {
                    increment -= 1
                } else if (reaction.emoji.name === '➡️') {
                    increment += 1
                } else if (reaction.emoji.name === '⏩') {
                    increment += 5
                } else if (reaction.emoji.name === '⬆️') {
                    if (editing[0] === 'R') {
                        color[0] += increment
                        if (color[0] > 254) color[0] = 254
                    }
                    if (editing[1] === 'G') {
                        color[1] += increment
                        if (color[1] > 254) color[1] = 254
                    }
                    if (editing[2] === 'B') {
                        color[2] += increment
                        if (color[2] > 254) color[2] = 254
                    }
                } else if (reaction.emoji.name === '⬇️') {
                    if (editing[0] === 'R') {
                        color[0] -= increment
                        if (color[0] < 0) color[0] = 0
                    }
                    if (editing[1] === 'G') {
                        color[1] -= increment
                        if (color[1] < 0) color[1] = 0
                    }
                    if (editing[2] === 'B') {
                        color[2] -= increment
                        if (color[2] < 0) color[2] = 0
                    }
                }

                embed.setDescription(`Currently incrementing \`${editing}\` by ${increment}\n
                ${color}\n
                🟥🟩🟦 Choose color\n
                ⏪⬅️➡️⏩ Adjust increment\n
                ⬆️⬇️ Apply increment`)
                embed.setColor(color)
                embedmsg.edit(embed)
            });

            collector.on('end', collected => {
                embed.setDescription(`Ran out of time. Behold your masterpiece!\n
                ${color}`)
                embed.setColor(color)
                embedmsg.edit(embed)
                embedmsg.reactions.removeAll()
            })
        })
	},
};