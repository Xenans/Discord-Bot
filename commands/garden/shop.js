const config = require('../../config.json');

module.exports = {
    name: 'plant',
    description: `Usage: \`${config.prefix}garden shop [plant_name]\`
    `,
    execute(message, args, client) {
        message.reply(`sorry, but this command hasn't been implemented yet...`)
    },
};