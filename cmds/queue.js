exports.run = async function (client, msg, args) {

const serverQueue = client.queue.get(msg.member.guild.id);
		if(!serverQueue) return msg.channel.createMessage('❌ | Im not playing anything right now');
		return msg.channel.createMessage(`🎶 | Now playing **${serverQueue.songs[0].title}**\n\n__**Song Queue**__: ${serverQueue.songs.map(x => `• ${x.title}`).join(' ')}`);
}