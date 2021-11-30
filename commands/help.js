const Discord = require('discord.js');
const { prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'help',
    description:
        `Usage: \`${prefix}help [command name]\`
    Provides a list of usable commands, or further information on how to use a command.`,
    execute(message, args, client) {
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

        //Parse possible commands
        commandDescription = ""
        commandNames = new Array()
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            commandNames.push(command.name)
            if (command.name === args[0]) {
                commandDescription = command.description
            }
        }

        const embed = new Discord.MessageEmbed()

        toSend = new String()
        //Send detailed information

        if (!args.length) {
            toSend = `Use \`${prefix}help [command name]\` for how to use a given command.\n
            Here's a list of available commands:`
            for (command of commandNames) {
                toSend += `\n${prefix}` + command
            }
            embed.setTitle("Help")
            embed.setDescription(toSend)

        } else if (commandDescription) {
            toSend = commandDescription
            commandNames = args[0]
            embed.setTitle(commandNames.replace(/^\w/, (c) => c.toUpperCase()))
            embed.setDescription(toSend)
        } else {
            toSend = 'Command not found!'
            embed.setTitle(toSend)
        }

        return message.channel.send(embed)
    },
};