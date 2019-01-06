exports.run = async function (client, msg. args) {
	const serverQueue = queue.get(msg.member.guild.id);
		if(!serverQueue) return msg.channel.createMessage('❌ | Im not playing anything right now');
		if(!msg.member.voiceState.channelID) return msg.channel.createMessage('❌ | You must join voice channel to stop queue');
		serverQueue.songs = [];
		msg.channel.createMessage('✅ | Stop current queue');
		return client.voiceConnections.get(msg.member.guild.id).stopPlaying();
    }
