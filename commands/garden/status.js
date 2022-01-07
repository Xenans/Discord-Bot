// TODO: Simply update the state of the garden and provide a summary of the user's balance as well as current rate of production
// This is probably where I'll do the math to calculate the performance of each garden

const config = require('../../config.json');

module.exports = {
    name: 'plant',
    description: `Usage: \`${config.prefix}garden status\`
    .`,
    execute(message, args, client) {
        message.reply(`sorry, but this command hasn't been implemented yet...`)
    },
};