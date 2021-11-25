const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config()

// Set up mongodb stuff
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const databaseName = 'mainDatabase'

// Replace the following with your Atlas connection string     
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@bot-moderator.gbwpq.mongodb.net/${databaseName}?retryWrites=true&w=majority`
// console.log(uri)
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoClient