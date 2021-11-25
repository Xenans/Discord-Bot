const fs = require('fs');
const discord = require('discord.js');
const config = require('./config.json');
const mongoClient = require('./helpers/mongoClient.js')
const dotenv = require('dotenv').config()
if (dotenv.error) {
  console.log("Warning: Error reading from .env file. You can ignore this if you are running on a cloud server and have initialized environment variables.")
}

// Can read from either a .env file or local variables in a cloud runtime
const token = process.env.TOKEN;

const client = new discord.Client({ presence: { activity: { name: `${config.prefix}help` } } });
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  //client.user.setActivity(`${config.prefix}help`)
  console.log('Hello World!');
});

client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  console.log(message.content)

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

async function main() {
  // when the client is ready, run this code
  // this event will only trigger one time after logging in
  try {
    console.log("Trying to connect to server")
    await mongoClient.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  }
  finally {
    await mongoClient.close();
    console.log("Closing server...")
  }

  client.login(token);
}

main().catch(console.dir)
