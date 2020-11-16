const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name)

        // List channels of guild
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})

// Bot secret token:
// https://discordapp.com/developers/applications/
// application -> Bot -> Token

client.login(token);