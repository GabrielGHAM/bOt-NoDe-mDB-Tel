const { Markup } = require('telegraf');
const deleteMessages = require('./deleteMessages');
module.exports = async function orderConf(ctx) {
  const message = await ctx.replyWithMarkdown("Sua compra foi enviada ao grupo!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: `ir para oferta`, url: `https://t.me/+QvbITc0rsrU3MDEx` }]
      ]
    }
  });
  await deleteMessages(ctx)  
  // Remove a mensagem após 5 segundos
  setTimeout(() => {
     ctx.telegram.deleteMessage(ctx.session.chatId, message.message_id).catch(error => {
    });
  }, 7000);
};