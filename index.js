const { GOOGLE_KEY } = process.env;
const PREFIX = process.env.PREFIX
const Eris = require('eris');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
require('./server.js')

const client = new Eris(process.env.TOKEN);
const youtube = new YouTube(GOOGLE_KEY);
client.queue = new Eris.Collection();
client.ErisEmber = require('./EmbedBuilder.js')
const queue = client.queue

client.on('ready', async () => {
  console.log(`Meliodas-Eris Is Ready !`)
})

client.on('messageCreate', async msg => {
	if(!msg.channel.guild || msg.author.bot) return;
	if(!msg.content.startsWith(PREFIX)) return;
	const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

  	try {
		let commandFile = require(`./cmds/${command}.js`);
		commandFile.run(client, msg, args);
	} catch (e) {
		console.log(e.message)
	} finally {
		console.log(`${msg.author.username} using command ${command}`)
  }
});

client.connect();
