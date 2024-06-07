const { Telegraf } = require("telegraf");
const TOKEN = "7333536576:AAEy1MtDXijiY1NYEEMCFv3L73cpnDbWrek";
const bot = new Telegraf(TOKEN);

const adminLink = "https://tg-app-admin.vercel.app";
const userLink = "https://web-app-tme-interface.vercel.app";

bot.start((ctx) => {
  const userId = ctx.from.id;
  const webAppUrl = userId == 5171708849 ? adminLink : `${userLink}?user_id=${userId}`;

  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: webAppUrl } }]],
    },
  });
});

bot.launch();
  