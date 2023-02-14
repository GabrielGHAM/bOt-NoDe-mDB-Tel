module.exports = async function checkUser(ctx,channelID) {

const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
const chatType = ctx.chat.type;

if (chatType !== 'private') {
  return ctx.reply('Este comando só pode ser usado no privado');
}

if (chatMember.status !== 'member' && chatMember.status !== 'administrator') {
  return ctx.reply(`Bot utilizado apenas por membros do grupo COMPROmilhas!`);
} return;
}

