const messagingApi = require('messaging-api-messenger');

const client = messagingApi.createClient({
  accessToken: process.env.MESSENGER_ACCESS_TOKEN,
  appSecret: process.env.MESSENGER_APP_SECRET
});

client.on('message', async context => {
  const { text } = context.event;

  if (text.includes('remind me to')) {
    const task = text.split('remind me to')[1];
    await client.sendText(context.event.sender.id, `Okay, I will remind you to ${task}`);

    // set a reminder to send a message in an hour
    setTimeout(() => {
      client.sendText(context.event.sender.id, `Don't forget to ${task}!`);
    }, 1000 * 60 * 60);
  } else {
    await client.sendText(context.event.sender.id, `I'm sorry, I didn't understand that. To set a reminder, try saying "remind me to <task>"`);
  }
});
