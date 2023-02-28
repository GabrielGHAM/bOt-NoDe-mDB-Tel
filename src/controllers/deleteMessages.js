module.exports = async function deleteMessages(ctx) {
    const chatId =  ctx.session.chatId
    const messageIds = ctx.session.messageIds;
    for (let i = 0; i < messageIds.length; i++) {
      await ctx.telegram.deleteMessage(chatId, messageIds[i]).catch(console.error);
    }
    ctx.session.messageIds = [];
    if (ctx.session.firstMessageId !== undefined) {
      await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.firstMessageId)
        .catch(error => {
          if (error.response && error.response.error_code === 400) {
            // A mensagem não foi encontrada, portanto não precisa fazer nada
            console.log('Mensagem não encontrada');
          } else {
            // Outro erro ocorreu, portanto exiba a mensagem de erro
            console.log('Erro ao deletar mensagem:', error);
          }
        });
    }
  }