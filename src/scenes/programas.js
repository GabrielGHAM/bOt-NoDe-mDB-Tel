const Markup = require('telegraf/markup');
module.exports = function reply(ctx) {
  ctx.replyWithMarkdown(`* Qual o programa?*`,
    Markup.keyboard([


    ['Smiles', 'Smiles Teto Diamante'],
    ['TAP', 'TAP Voucher'],
    ['Latam Wallet', 'Latam'],
    ['Azul Voucher_RT', 'Azul Interline'],
    ['Azul', 'Avios Ibéria'],
    ['AeroMéxico', 'Volta Cancelada'],
    ['United', 'AmericanAirline'],
    ['Outros']
    ])
      .resize()
      .oneTime()
      .extra({
        remove_keyboard: true
      })
  );
};