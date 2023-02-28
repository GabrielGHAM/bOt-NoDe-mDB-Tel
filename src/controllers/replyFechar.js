const { Markup } = require('telegraf');

module.exports = async function replyClosedFunc(ctx, message) {
  ctx.session.messageIds = ctx.session.messageIds ?? [];

  return await ctx.replyWithHTML(message).then(({ message_id }) => {
     ctx.session.messageIds.push(message_id);
  });
}