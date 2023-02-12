

const { Markup } = require('telegraf');
const Telegraf = require('telegraf');
const replyClosed = require("../controllers/replyFechar");

module.exports = function cancelOrder(ctx) {
  ctx.scene.leave();
  ctx.reply(`Sua compra foi cancelada.\nCaso queira comprar novamente clique em Comprar. `, {
    reply_markup: Markup.inlineKeyboard([
      [Markup.callbackButton('Comprar', 'comprar')],
      [Markup.callbackButton('Menu', 'menu')]
    ])
  });

}

