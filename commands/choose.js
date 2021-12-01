const config = require('../config.json');
const utils = require('../helpers/utils.js')

module.exports = {
    name: 'choose',
    description: `Usage: \`${config.prefix}choose [choice 1] | <choice 2> | <...>\`
    Chooses between various options separated by \`|\`.`,
    execute(message, args, client) {
        let choices = message.content.slice(config.prefix.length + this.name.length).split(/\|/).map(choice => choice.trim())
        const randomChoice = utils.chooseRandom(choices)

        if (randomChoice) {
            message.channel.send(`"${randomChoice}" of course`)
            // message.channel.send(`"${randomChoice}" is the best choice`)
        } else {
            message.reply(`please provide a valid choice...`)
        }
    },
};