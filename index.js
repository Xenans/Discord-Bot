const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');
const mongoClient = require('./helpers/mongoClient.js')
const reactions = require('./reactions/reactions.js')
const dotenv = require('dotenv').config()
if (dotenv.error) {
    console.log("Warning: Error reading from .env file. You can ignore this if you are running on a cloud server and have initialized environment variables.")
}

const client = new Client({ presence: { activity: { name: `${config.prefix}help` } }, intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// this event will only trigger once after the client is ready and logging in
client.once('ready', () => {
    console.log(`Hello World! My name is ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.author.bot) return;
    // If it's not a command, check for reactions
    if (!message.content.startsWith(config.prefix)) {
        reactions.checkReactions(message)
        return
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        mongoClient.db('log').collection(message.guild.id).insertOne({ message: message.content })
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

async function main() {
    try {
        console.log("Connecting to MongoDB database...")
        await mongoClient.connect();
        console.log("Connection established with MongoDB database!");
    } catch (err) {
        console.log(err.stack);
    }

    let token = process.env.TOKEN;
    client.login(token);
}

main().catch(console.dir)


function gracefulShutdown(err) {
    console.log(err)
    mongoClient.db('log').collection(message.guild.id).insertOne({ message: err })
    mongoClient.close(false, () => {
        console.log('MongoDb connection closed.');
    });
}
// Ask node to run your function before exit:

// This will handle process.exit():
process.on('exit', gracefulShutdown);

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGKILL', gracefulShutdown);

// This will prevent dirty exit on code-fault crashes:
process.on('uncaughtException', gracefulShutdown);