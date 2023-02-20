const telegramBot = require('node-telegram-bot-api');
const {getPrompt} = require('./createPrompt');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(TELEGRAM_TOKEN, {polling: true});

bot.on('message', async (message)=>{
    const text = message.text;
    const chatId = message.from.id;

    const res = await getPrompt(text);

    bot.sendMessage(chatId, res)
})