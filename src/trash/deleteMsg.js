module.exports = function deleteMsg(ctx){
let lastMessageId;
if (ctx.update.callback_query) {
  lastMessageId = ctx.update.callback_query.message.message_id;
} else {
  lastMessageId = ctx.update.message.message_id;
}

while (lastMessageId >= 2) {
  try {
     ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId - 1);
     ctx.telegram.deleteMessage(ctx.chat.id, lastMessageId);
    lastMessageId -= 1;
  } catch (error) {
    console.error(error);
    break;
  }
}}  