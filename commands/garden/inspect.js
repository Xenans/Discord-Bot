// TODO: Provide description of the plant here, it's tier, individual production, and contribution to nearby plants
const config = require('../../config.json');

module.exports = {
    name: 'plant',
    description: `Usage: \`${config.prefix}garden inspect [coordinates]\`
    `,
    execute(message, args, client) {
        message.reply(`sorry, but this command hasn't been implemented yet...`)
    },
};