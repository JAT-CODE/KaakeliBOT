const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
//Jquery
var jsdom = require("jsdom");
const { default: Axios } = require('axios');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name)
    })
})

client.on('message', async (message) => {
    if (message.content.startsWith('!lunch')) {
        processCommand(message)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1).toLowerCase(); //remove leading command char
    let splitCommand = fullCommand.split(" ") //Split message to pieces 
    let primaryCommand = splitCommand[0] //First word after split
    let arguments = splitCommand.slice(1) //Other words work as arguments/params for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == 'lounas' || 'lunch') {
        lunchCommand(receivedMessage); 
    }
}

//Bot command to fetch lunch options for current day
function lunchCommand(receivedMessage) {

    var d = new Date();
    var month = d.getUTCMonth() +1;
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;
    receivedMessage.channel.send(newdate);

    Axios.get('https://foodandco.fi/modules/json/json/Index?costNumber=0439&language=fi')
        .then((response) => {
            for (let index = 0; index < 6; index++) {

                //change date to be set at bot launch instead of command..
                var jsonDate = response.data.MenusForDays[index].Date;
                var boolean = jsonDate.includes(newdate);
                if (boolean) {
                    let lounas = JSON.stringify(response.data.MenusForDays[index], null, "\t");
                    console.log(lounas);
                    receivedMessage.channel.send("```"+lounas+"```"); 
                }
            }
        })
    

    //jQuery that I couldn't get to work, CORS error.. used Axios instead for json access
    /*$.ajax({
        url: "https://foodandco.fi/modules/json/json/Index?costNumber=0439&language=fi",
        type: 'GET',
        dataType: 'JSONP',
        success: function(data){
            console.log("testI");
            let lounas = JSON.stringify(data);
            receivedMessage.channel.send(lounas);

            console.log(lounas); 
        }
    })*/
}

// Bot secret token:
// https://discordapp.com/developers/applications/
// application -> Bot -> Token
// (Hidden in config file for git pushing)

client.login(token);