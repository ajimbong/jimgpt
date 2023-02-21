const telegramBot = require('node-telegram-bot-api');
const {getPrompt} = require('./createPrompt');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(TELEGRAM_TOKEN, {polling: true});

bot.on('message', async (message)=>{
    const text = message.text;
    const chatId = message.from.id;
    const isBot = message.from.is_bot;

    const greetedUsers = new Set();

    if (message === '/start') {
        // Check if the user is not a bot and has not been greeted before
        if (!isBot && !greetedUsers.has(chatId)) {
            // Send a welcome message
            bot.sendMessage(chatId, 'Welcome human, how can I help?.');
      
            // Add the user to the set of greeted users
            greetedUsers.add(chatId);
        } else {
            // Send a reply message
            bot.sendMessage(chatId, 'Welcome back!');
        }
    } else {
        try {
            const res = await getPrompt(text);
            bot.sendMessage(chatId, res);
        }
        catch (ex) {
            console.error(ex);
        }
    }


})

bot.on("polling_error", (error) => {
  console.log(error);
});