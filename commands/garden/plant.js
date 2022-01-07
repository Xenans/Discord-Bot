// Plant a plant in a given thing
// Checks your balance if you have enough
// Uproots the existing plant
// Confirm with the user if they would like to uproot the existing plant

const config = require('../../config.json');

module.exports = {
    name: 'plant',
    description: `Usage: \`${config.prefix}garden plant [plant_name] [coordinates]\`
    .`,
    execute(message, args, client) {
        message.reply(`sorry, but this command hasn't been implemented yet...`)
    },
};