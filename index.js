const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new telegramBot(TELEGRAM_TOKEN, {polling: true});

bot.on('message', (message)=>{
    const text = message.text;
    const chatId = message.from.id;

    bot.sendMessage(chatId, text)
})