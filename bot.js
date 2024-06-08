const { Telegraf } = require("telegraf");
const TOKEN = "Your_Telegram_Bot_Token"; // Replace with your Telegram bot token
const bot = new Telegraf(TOKEN);

const adminLink = "https://tg-app-admin.vercel.app";
const userLink = "https://web-app-tme-interface.vercel.app";
bot.start((ctx) => {
  const userId = ctx.from.id;
  const firstName = ctx.from.first_name || "Unknown";
  const lastName = ctx.from.last_name || "Unknown";

  const webAppUrl = `${userId == 5171708849 ? adminLink : userLink}?user_id=${userId}&first_name=${firstName}&last_name=${lastName}`;

  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: webAppUrl } }]],
    },
  });
});


bot.launch();
