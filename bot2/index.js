
const { Telegraf, Markup, session } = require("telegraf");
const express = require('express');
const fetch = require('node-fetch');
// const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const BOT_TOKEN=""
const SERVER_URL=""
const port = 4040;



const TELEGRAM_API=`https://api.telegram.org/bot${BOT_TOKEN}`;
const URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = SERVER_URL+URI

app.use(express.json());
app.use(bodyParser.json());
const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data)
}

app.listen(port, async () => {
    console.log('app is running on port', port)
    await init()
})

const bot = new Telegraf(BOT_TOKEN);

const web_link = "";

bot.start((ctx) => {
  const startPayload = ctx.startPayload;
  const urlSent = `${web_link}?ref=${startPayload}`;

  const user = ctx.message.from;
  const userName = user.username ? `@${user.username}` : user.first_name;
  ctx.replyWithMarkdown(`*Hey, ${userName}! Welcome`, {
      reply_markup: {
          inline_keyboard: [
            [{ text: "Hi", web_app: { url: urlSent } }]
            
          
          ],
          in: true
      },
  });
});



  

  app.get("/", async (req, res) => {
    res.send("Hello Get me here i work fineddd")
  });

  app.post(URI, (req, res) => {
    bot.handleUpdate(req.body);
    res.status(200).send('Received Telegram webhook');
});

app.get('/webhook', (req, res) => {
    res.send('Hey, Bot is awake!');
});
