exports.run = async (client, msg, args) => {
  var message = msg
  var bot = client
    if (message.author.id !== '327586923252285440') return;
    try {
        let codein = args.slice(1).join(" ");
        let code = eval(codein);
        if (codein.includes(`token`)) {
        code = 'gabole >:(';
        } else {
        code = eval(code);
        }

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new client.ErisEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.createMessage({embed})
    } catch(e) {
        message.channel.createMessage(`\`\`\`js\n${e}\n\`\`\``);
    }
}
