const { Markup } = require('telegraf');

module.exports = async function replyClosedFunc(ctx, message) {

  return ctx.telegram.sendMessage(ctx.chat.id, message, {
    parse_mode: 'Markdown'
  });
};
