const { Telegraf, Markup } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const comprar = require('./src/scenes/comprar');
const { channelID } = require("./src/util/config.json");
const connect = require("./src/database/connect");
const menuS = require("./src/controllers/menuS");


require('dotenv').config()

const client = new Telegraf(process.env.TOKEN);

client.telegram.options.parse_mode = 'markdown';


client.on('new_chat_members', (ctx) => {
  const member = ctx.message.new_chat_members[0].username || ctx.message.new_chat_members[0].first_name;
  client.telegram.getMe().then((botInfo) => {
    const botUsername = botInfo.username;
    client.telegram.sendMessage(channelID, `@${member} Bem-vindo(a) ao GRUPO\\! Caso queira anunciar uma compra, envie uma mensagem privada para @${botUsername}, dizendo "Comprar".`)
      .catch((error) => {
        console.error(error);
        client.telegram.sendMessage(channelID, ` ATENÇÃO @${botUsername} Ocorreu um erro, preciso que aperta "/start" no meu privado!.`);
      });
  });
});

const stage = new Stage([comprar]);
client.use(session());

client.use(stage.middleware());

client.start(async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
  const chatType = ctx.chat.type;
  const args = ctx.message.text.split(" ");

  if (chatType !== 'private') {
    return ctx.replyWithMarkdown(' *Este comando só pode ser usado no privado*');
  }

  if (chatMember.status !== 'member' && chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
    return ctx.replyWithMarkdown(` *Bot utilizado apenas por membros do grupo COMPROmilhas!*`);
  }

  if (args[1] === 'menu') {
    return menuS(ctx, Markup, client);
  } else { 
    (args[1] === 'comprar') 
    return ctx.scene.enter('comprar');
  } 
});




client.hears([/menu/i], async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
  const chatType = ctx.chat.type;

  if (chatType !== 'private') {
    return ctx.replyWithMarkdown(' *Este comando só pode ser usado no privado*');
  }

  if (chatMember.status !== 'member' && chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
    return ctx.replyWithMarkdown(` *Bot utilizado apenas por membros do grupo COMPROmilhas!*`);
  }
  return menuS(ctx, Markup, client);
});



client.hears(/comprar/i, async (ctx) => {

  const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
  const chatType = ctx.chat.type;

  if (chatType !== 'private') {
    return ctx.replyWithMarkdown('* Este comando só pode ser usado no privado *');
  }

  if (chatMember.status !== 'member' && chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
    return ctx.replyWithMarkdown(ctx, ` *Bot utilizado apenas por membros do grupo COMPROmilhas! *`);
  } return ctx.scene.enter('comprar');
});

client.launch().then(() => {
  console.log("Bot está online.");
})