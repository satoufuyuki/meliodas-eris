const { GOOGLE_KEY } = process.env;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(GOOGLE_KEY)

exports.run = async function ( bot, message, args ) {
  
  var msg = message;
  var client = bot;
  
  		const voiceChannel = msg.member.voiceState;
		if(!voiceChannel.channelID) return msg.channel.createMessage('❌ | You must in voice channel to play music');
		if(!args.length) return msg.channel.createMessage('❌ | No query provided');
		if (/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/.test(args[0])) {
			const playlist = await youtube.getPlaylist(args[0]);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				try{
					const vid = await youtube.getVideoByID(video.id);
					await handleVideo(vid, msg, voiceChannel, true);
				}catch(e) { continue }
			}
			return msg.channel.createMessage(`✅ | **${playlist.title}**: has been added to queue`);
		}
		try{
			const video = await youtube.getVideo(args[0]);
			return handleVideo(video, msg, voiceChannel);
		}catch(error){
			const videos = await youtube.searchVideos(args.join(' '), 1);
			if(!videos.length) return msg.channel.createMessage('❌ | No result found');
			const video = await youtube.getVideoByID(videos[0].id);
			return handleVideo(video, msg, voiceChannel);
    }
  async function handleVideo(video, msg, voiceChannel, hide = false){
	const serverQueue = bot.queue.get(msg.channel.guild.id);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	}
	if(!serverQueue){
		let queueConstruct = {
			channel: msg.channel,
			voiceChannel: voiceChannel.channelID,
			songs: [song],
			loop: false,
			volume: 5,
			connection: null
		}
		const mess = await msg.channel.createMessage('⏱️| Joining Voice channel');
		queueConstruct.connection = await client.joinVoiceChannel(voiceChannel.channelID);
		await mess.delete();
    bot.queue.set(msg.channel.guild.id, queueConstruct);
		return play(msg.channel.guild, queueConstruct.songs[0]);
	}
	serverQueue.songs.push(song);
	if(!hide) return msg.channel.createMessage(`✅ | **${song.title}** added to queue`);


function play(guild, song){
	const serverQueue = bot.queue.get(guild.id);
	if(!song){
		bot.queue.delete(guild.id);
		return client.leaveVoiceChannel(serverQueue.voiceChannel);
	}
	serverQueue.connection.play(ytdl(song.url, { filter: 'audioonly' }))
	serverQueue.connection.on('end', () => {
		const shiffed = serverQueue.songs.shift();
		if(serverQueue.loop) serverQueue.songs.push(shiffed);
		return play(guild, serverQueue.songs[0]);
	});
	serverQueue.channel.createMessage(`🎶 | Now playing **${song.title}**`);
  
}
    }
}
