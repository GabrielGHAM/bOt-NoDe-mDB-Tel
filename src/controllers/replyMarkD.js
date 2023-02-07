const { Markup } = require('telegraf');
module.exports = function replyWmark(ctx, message){
    return ctx.telegram.sendMessage(ctx.chat.id, message,{ parse_mode: 'Markdown' })}