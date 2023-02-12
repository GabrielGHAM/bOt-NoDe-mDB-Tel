const { Markup } = require('telegraf');
module.exports = async function orderConf(ctx) {
  let lastMessageId;
  if (ctx.update.callback_query) {
    lastMessageId = ctx.update.callback_query.message.message_id;
  } else {
    lastMessageId = ctx.update.message.message_id;
  }
  
  while (lastMessageId >= 2) {
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 10);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 9);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 8);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 7);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 6);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 5);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 4);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 3);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 2);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 1);
      await ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId);
      lastMessageId -= 1;
    } catch (error) {
      console.error(error);
      break;
    }
  }  

 ctx.replyWithMarkdown("Sua compra foi enviada ao grupo!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: `ir para oferta`, url: `https://t.me/+hubLnSS63H8yNjgx` }]
      ]
    }
  });
};
