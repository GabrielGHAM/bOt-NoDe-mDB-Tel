const deleteMessages = require('./deleteMessages');
async function startTimer(ctx) {
  //console.log(`Iniciando temporizador no passo ${ctx.wizard.cursor} da cena ${ctx.scene.current.id}...`);

  if (ctx.wizard.state.timer) {
    cancelTimer(ctx);
  }
  ctx.wizard.state.timer = setTimeout(async () => {
    const timeoutMessage = await ctx.reply('Tempo limite excedido!\nOferta cancelada \nClique em Menu e inicie uma nova oferta', {
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
    try {
      await deleteMessages(ctx)
    } catch (err){}  
  ctx.scene.leave()
  setTimeout(async() => {
    await ctx.telegram.deleteMessage(ctx.session.chatId, timeoutMessage.message_id)
      .catch(console.error);
  }, 12000);
}, 70000);
}

async function cancelTimer(ctx) {
 // console.log(`encerrando temporizador no passo ${ctx.wizard.cursor} da  ${ctx.scene.current.id}...`);
  if (ctx.wizard) {
    clearTimeout(ctx.wizard.state.timer);
    delete ctx.wizard.state.timer;
  }
}
module.exports = { startTimer, cancelTimer };