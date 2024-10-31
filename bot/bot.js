const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN=''
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/echo/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = 'sa';
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
        const userProfilePhotos = await bot.getUserProfilePhotos(msg.from.id);
        if (userProfilePhotos.total_count > 0) {
            const fileId = userProfilePhotos.photos[0][0].file_id;

            // Send the photo directly using the file ID
            await bot.sendPhoto(chatId, fileId, { caption: 'Here is your profile picture.' });
        } else {
            await bot.sendMessage(chatId, 'No profile picture found.');
        }
    } catch (error) {
        console.error('Error fetching profile picture:', error.response ? error.response.body : error.message);

        await bot.sendMessage(chatId, 'There was an error fetching your profile picture.');
    }

    bot.sendMessage(chatId, msg.from.id);
});

module.exports = bot;
