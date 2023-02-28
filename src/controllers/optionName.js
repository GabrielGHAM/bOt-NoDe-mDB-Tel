const { Markup } = require('telegraf');

module.exports = function optionName(ctx, name) {
  const botInfo = ctx.botInfo.username;

  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Vender', url: `https://t.me/${name}`
          },
          {
            text: 'Oferta de Compra', url: `https://t.me/${botInfo}?start=menu`
          }
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    },
  }

}
