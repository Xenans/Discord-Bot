const {prefix} = require('../config.json');

module.exports = {
	name: 'purge',
    description: 
    `Usage: \`${prefix}purge [person] <number>\`\n
    Clears the most recent messages.\n
    Number cannot exceed 10 to prevent abuse.`,
    
	execute(message, args, client) {
        if (!args.length) {
            return message.channel.send(`No arguments provided. See \`${prefix}help purge\` for more information.`)
        } else if (args.length === 1) {
            amount = parseInt(args[0], 10);
            if (!Number.isInteger(amount)) {
                return message.channel.send(`Please provide an integer number of messages to delete.`)
            } else if (amount <= 0) {
                return message.channel.send(`Please provide a positive number of messages to delete`)
            } else if (amount > 50) {
                return message.channel.send(`At most 50 messages ~~can~~ will be deleted at a time.`)
            }
            return message.channel.bulkDelete(amount)
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
            } else if (amount > 50) {
                return message.channel.send(`At most 50 messages ~~can~~ will be deleted at a time.`)
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