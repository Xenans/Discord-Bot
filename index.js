const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
// const MongoClient = require('mongodb').MongoClient;


const dotenv = require('dotenv').config()
if (dotenv.error) {
    console.log("Error reading from .env file. You can ignore this if you are running on a cloud server and have initialized environment variables.")
}

// Can read from either a .env file or local variables in a cloud runtime
const token = process.env.TOKEN;

const client = new Discord.Client({ presence: { activity: { name: `${prefix}help` } } });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// // Set up mongodb stuff


// let mongoUsername = process.env.MONGO_USERNAME;
// let mongoPassword = process.env.MONGO_PASSWORD;

// const uri = "mongodb+srv://" + mongoUsername + ":" + mongoPassword + "@bot-moderator.gbwpq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const mongoClient = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// async function run() {
//     try {
//         await mongoClient.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await mongoClient.close();
//     }
// }
// run().catch(console.dir);


// mongoUtil.connectToServer(function(err, client){
//     if (err) console.log(err);
//     // start the rest of your app here
//   });



// Discordbot code below

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
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);