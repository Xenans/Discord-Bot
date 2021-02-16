const {prefix} = require('../config.json');
module.exports = {
	name: 'hotel?',
	description: `Usage: \`${prefix}hotel?\`\n
	Need inspiration for your next trip?`,
	execute(message, args, client) {
		message.channel.send('Trivago.');
	},
};