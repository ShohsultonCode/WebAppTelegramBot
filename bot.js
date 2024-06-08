require('dotenv').config();
const { Telegraf } = require("telegraf");

const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;
const adminLink = process.env.ADMIN_INTERFACE;
const userLink = process.env.USER_INTERFACE;

const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
  const userId = ctx.from.id;
  const webAppUrl = userId == ADMIN_ID ? `${adminLink}?user_id=${userId}` : `${userLink}?user_id=${userId}`;

  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: webAppUrl } }]],
    },
  });
});

bot.launch();
