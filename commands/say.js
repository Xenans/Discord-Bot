const {prefix} = require('../config.json');
module.exports = {
	name: 'say',
	description: `Usage: \`${prefix}say <message>\`\n
	Repeats a given message. Please try not to abuse this command.`,
	execute(message, args, client) {
		if (!args.length) {
			return message.channel.send(`Please include a message!`)
		}
		concat = ""
		for (arg of args) {
			//Filter @everyone
			if (arg === "@everyone")
			{
				concat += " " + "@.everyone"
				continue;
			}
			//Filter mentions
			const matches = arg.match(/^<@!?(\d+)>$/);
			if (matches)
			{
				concat += " " + "@" + client.users.cache.get(matches[1]).tag
				continue;
			}

			concat += " " + arg
		}
		message.channel.send(concat);
	},
};