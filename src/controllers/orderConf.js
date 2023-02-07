const { Markup } = require('telegraf');

const replyWmark = require('./replyMarkD');
module.exports = function orderConf(ctx) {
 ctx.replyWithMarkdown("✅*Sua compra foi enviada ao grupo!*", {
    reply_markup: {
      inline_keyboard: [
        [{ text: `ir para oferta`, url: `https://t.me/+hubLnSS63H8yNjgx` }]
      ]
    }
  });
};
