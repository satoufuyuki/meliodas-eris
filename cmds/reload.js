exports.run = async function (client, message, args)  {

    if (message.author.id !== "327586923252285440") return message.channel.createMessage("⛔ **ONLY MY ONWER CAN USE THIS**");

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
      console.log(e)
        return message.channel.createMessage(`Unable to reload \`${args[0]}.js\``);
    }

    message.channel.createMessage(`**Command \`${args[0]}.js\` successfully reloaded!** `);

}
