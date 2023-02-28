const { channelID } = require("../util/config.json");

module.exports = async function checkMembershipMiddleware(ctx, next){
    const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
    const chatType = ctx.chat.type;
  
    if (chatType !== 'private') {
      return;
    }
    if (chatMember.status !== 'member' && chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
      return ctx.replyWithMarkdown(` *Bot utilizado apenas por membros do grupo COMPROmilhas!*`);
    }
    await next();
  }

