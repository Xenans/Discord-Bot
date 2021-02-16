// require file system module to read files
const fs = require('fs');
const path = require('path');
// require the discord.js module
const Discord = require('discord.js');
//const { prefix, token } = require(path.resolve('./config.json'));
const { prefix } = require('./config.json');
const { token } = require('./token.json')

// create a new Discord client
const client = new Discord.Client({presence: {activity: {name: `${prefix}help`}}});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    //client.user.setActivity(`${prefix}help`)
	console.log('Hello World!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    
    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);