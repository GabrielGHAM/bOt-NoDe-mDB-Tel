const { Markup } = require('telegraf');
const Telegraf = require('telegraf');

module.exports = function cancelOrder(ctx) {
  ctx.scene.leave();
  ctx.reply(`Sua compra foi cancelada.\nClique em Menu e inicia sua oferta. `, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Menu', callback_data: 'menu'
          }
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
}