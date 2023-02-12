const { Telegraf, Markup } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const comprar = require('./src/scenes/comprar');
const { channelID } = require("./src/util/config.json");
const milhasScene = require('./src/scenes/milhas.js');
const vouWallScene = require('./src/scenes/vouWall.js');
const vcScene = require('./src/scenes/voltaCanc.js');
const otherScene = require('./src/scenes/others.js');
const connect = require("./src/database/connect");
const menuS = require("./src/controllers/menuS");
const cancelOrder = require("./src/controllers/closeScene");


require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN);




bot.on('new_chat_members', (ctx) => {
  const member = ctx.message.new_chat_members[0].username || ctx.message.new_chat_members[0].first_name;
  bot.telegram.getMe().then((botInfo) => {
    const botUsername = botInfo.username;
    bot.telegram.sendMessage(channelID, `@${member} Bem-vindo(a) ao GRUPO\\! Caso queira anunciar uma compra, envie uma mensagem privada para @${botUsername}, dizendo "Comprar".`)
      .catch((error) => {
        console.error(error);
        bot.telegram.sendMessage(channelID, ` ATENÇÃO @${botUsername} Ocorreu um erro, preciso que aperta "/start" no meu privado!.`);
      });
  });
});

const stage = new Stage([comprar, milhasScene, vouWallScene, vcScene, otherScene]);
bot.use(session());

bot.use(stage.middleware());

bot.start(async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
  const chatType = ctx.chat.type;
  const args = ctx.message.text.split(" ");


  if (chatType !== 'private') {
    return ctx.replyWithMarkdown(' *Este comando só pode ser usado no privado*');
  }

  if (chatMember.status !== 'member' && chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
    return ctx.replyWithMarkdown(` *Bot utilizado apenas por membros do grupo COMPROmilhas!*`);
  }

  if (args[1] === 'comprar') {
    
    return ctx.scene.enter('comprar');

  } else {
    (args[1] === 'menu')
    return menuS(ctx, Markup, bot);
  }
});


bot.hears([/menu/i], async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(channelID, ctx.from.id);
  const chatType = ctx.chat.type;

  if (chatType !== 'private') {
    return ctx.replyWithMarkdown(' *Este comando só pode ser usado no privado*');
  }

  if (chatMember.status !== 'member' && chatMember.status !== 'administrator' && chatMember.status !== 'creator') {
    return ctx.replyWithMarkdown(` *Bot utilizado apenas por membros do grupo COMPROmilhas!*`);
  }
  return menuS(ctx, Markup, bot);
});


bot.action('close', ctx => {
  return cancelOrder(ctx);
})

bot.action('comprar', ctx => {
  ctx.scene.enter('comprar');
})

bot.action('menu', ctx => {
  return menuS(ctx, Markup, bot);
})

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

bot.launch().then(() => {
  console.log("Bot está online.");
})

module.exports = bot;