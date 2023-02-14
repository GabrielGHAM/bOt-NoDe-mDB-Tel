index

bot.hears(/comprar/i, async (ctx) => {

  const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
  const chatType = ctx.chat.type;

  if (chatType !== 'private') {
    return ctx.replyWithMarkdown('* Este comando só pode ser usado no privado *');
  }

  if (chatMember.status !== 'member' && chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
    return ctx.replyWithMarkdown(ctx, ` *Bot utilizado apenas por membros do grupo COMPROmilhas! *`);
  } return ctx.scene.enter('comprar');
});


