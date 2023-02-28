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



// Definir o limite de envio de mensagens (20 mensagens por minuto)
const MESSAGE_LIMIT = 20;
const TIME_LIMIT_MS = 60 * 1000 / MESSAGE_LIMIT;

// Função para verificar se o usuário atingiu o limite de envio de mensagens
function isUserAtMessageLimit(ctx) {
  const now = new Date().getTime();
  const lastMessageTime = ctx.session.lastMessageTime || 0;
  const timeSinceLastMessage = now - lastMessageTime;
  return timeSinceLastMessage < TIME_LIMIT_MS;
}

// Enviar uma mensagem (com verificação de limite de envio de mensagens)
function sendMessage(ctx, message) {
  if (!isUserAtMessageLimit(ctx)) {
    // Enviar a mensagem
    ctx.reply(message);

    // Registrar o tempo da última mensagem enviada
    ctx.session.lastMessageTime = new Date().getTime();
  } else {
    // Excedido o limite de envio de mensagens
    const remainingTime = TIME_LIMIT_MS - (new Date().getTime() - ctx.session.lastMessageTime);
    ctx.reply(`Você atingiu o limite de envio de mensagens. Tente novamente em ${Math.ceil(remainingTime / 1000)} segundos.`);
  }
}




const { limit } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Limita o bot a enviar no máximo 5 mensagens em um período de 5 segundos
bot.use(limit({ window: 5000, limit: 5 }))

bot.on('text', (ctx) => {
  ctx.reply('Olá, mundo!')
})

bot.launch()