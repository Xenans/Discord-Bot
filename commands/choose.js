const config = require('../config.json');
const utils = require('../helpers/utils.js')

module.exports = {
    name: 'choose',
    description: `Usage: \`${config.prefix}choose\``,
    execute(message, args, client) {
        let choices = message.content.slice(config.prefix.length + this.name.length).split(/\|/).map(choice => choice.trim())
        const randomChoice = utils.chooseRandom(choices)

        if (randomChoice) {
            message.channel.send(`'${randomChoice}' of course`)
        } else {
            message.reply(`please provide a valid choice...`)
        }
    },
};