const {prefix} = require('../config.json');

module.exports = {
	name: 'purgerecent',
    description: 
    `Usage: \`${prefix}purgerecent <person> [time]\`\n
    Not implemented\n
    Clears the most recent messages within a given time in minutes.`,
	execute(message, args) {
        return
        if (!args.length) {
            return message.channel.send(`No arguments provided. See \`${prefix}help purge\` for more information.`)
        } else if (args.length === 1) {
            time = parseInt(args[0], 10);
            if (!Number.isInteger(time)) {
                return message.channel.send(`Please provide an integer number of minutes.`)
            } else if (time <= 0) {
                return message.channel.send(`Please provide a positive number of minutes`)
            }

            //return message.channel.bulkDelete(amount)
        } else {
            user = message.mentions.members.first()
            amount = args[1]
            //Check that inputs are valid
            if (!user){
                return message.channel.send(`Invalid user. Please check your formatting.`)
            }
            amount = parseInt(args[1], 10);
            if (!Number.isInteger(amount)) {
                return message.channel.send(`Please provide an integer number of messages to delete.`)
            } else if (amount <= 0) {
                return message.channel.send(`Please provide a positive number of messages to delete`)
            } else if (amount > 10) {
                return message.channel.send(`At most 10 messages ~~can~~ will be deleted at a time.`)
            }
            messagesToDelete = new Array();
            count = 0

            async function deleteMessages() {
                await message.channel.messages.fetch()
                .then(messages => messages.filter(m => m.author.id === user.id).map(msg => {if (count < amount){count++;messagesToDelete.push(msg.id)}}))
                message.channel.bulkDelete(messagesToDelete)
            }
            deleteMessages()
            return
        }
	},
};