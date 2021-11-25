const config = require('../config.json');
module.exports = {
    name: 'choose',
    description: `Usage: \`${config.prefix}choose\``,
    execute(message, args, client) {
        console.log(message.content)
        let choices = message.content.slice(config.prefix.length + this.name.length).split(/\|/).map(choice => choice.trim())
        console.log(choices)
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];

        // TODO: Deal with empty message edge case
        if (randomChoice) {
            message.channel.send(`${randomChoice} of course`)
        } else {
            message.reply(`please provide a valid choice...`)
        }
    },
};