const {prefix} = require('../config.json');
module.exports = {
	name: 'ping',
	description: `Usage: \`${prefix}ping\`\n
	Ping!`,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};