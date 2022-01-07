// TODO: Remove a plant

const config = require('../../config.json');

module.exports = {
    name: 'plant',
    description: `Usage: \`${config.prefix}garden uproot [coordinates]\`
    .`,
    execute(message, args, client) {
        message.reply(`sorry, but this command hasn't been implemented yet...`)
    },
};