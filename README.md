# Discord-Bot
This repository contains the code behind Bot-Moderator Bot, with features such as cleaning up messages and many more to come!

Make sure to include your token in a `.env` file. Alternatively, this bot can be easily hosted on Heroku; just set up the config variables to include your token.

```
token=your.token.here
```

# Structure

`index.js` handles reading user messages and awaits messages with the appropriate command prefix. The commands under the `\commands` folder are visible to all users and listed by the `help` command.