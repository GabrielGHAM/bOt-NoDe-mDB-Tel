const { Telegraf } = require('telegraf');
const { startTimer, cancelTimer } = require('../controllers/startTimer');
const deleteMessages = require('./deleteMessages');

module.exports = async function cancelOrder(ctx) {
  await deleteMessages(ctx)
  await cancelTimer(ctx).then(ctx.scene.leave())  
  // Mostra a mensagem de cancelamento
  const cancelMessage = await ctx.reply(`Sua compra foi cancelada.\nClique em Menu e inicie uma nova oferta. `, {
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
  setTimeout(() => {
    ctx.telegram.deleteMessage(cancelMessage.chat.id, cancelMessage.message_id)
      .catch(error => {
        if (error.response && error.response.error_code === 400) {
          // A mensagem não foi encontrada, portanto não precisa fazer nada
          console.log('Mensagem não encontrada');
        } else {
          // Outro erro ocorreu, portanto exiba a mensagem de erro
          console.log('Erro ao deletar mensagem:', error);
        }
      });
  }, 12000);
}