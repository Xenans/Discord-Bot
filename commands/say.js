const {prefix} = require('../config.json');
module.exports = {
	name: 'say',
	description: `Usage: \`${prefix}say <message>\`\n
	Repeats a given message. Please try not to abuse this command.`,
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(`Please include a message!`)
		}
		concat = ""
		for (arg of args) {
			concat += " " + arg
		}
		message.channel.send(concat);
	},
};