const { Markup } = require('telegraf');

module.exports = function cancelOrder(ctx) {
  ctx.scene.leave();
  ctx.reply(`* Sua compra foi cancelada.\n\nCaso queira comprar novamente clique em Comprar.* `,
  Markup.keyboard([
    [' Comprar'], [' Menu']
  ])
  .oneTime()
  .resize()
  .extra({ parse_mode: 'Markdown' }))}

