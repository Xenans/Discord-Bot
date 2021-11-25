const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config()

// Set up mongodb stuff
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

// Replace the following with your Atlas connection string     
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@bot-moderator.gbwpq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
console.log(uri)
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
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
}
run().catch(console.dir)


// mongoUtil.connectToServer(function(err, client){
//     if (err) console.log(err);
//     // start the rest of your app here
//   });