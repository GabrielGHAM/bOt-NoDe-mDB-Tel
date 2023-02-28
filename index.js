const { Telegraf, session, Stage, Scenes, } = require('telegraf');
const comprar = require('./src/scenes/comprar');
const { channelID } = require("./src/util/config.json");
const milhasScene = require('./src/scenes/milhas.js');
const vouWallScene = require('./src/scenes/vouWall.js');
const vcScene = require('./src/scenes/voltaCanc.js');
const otherScene = require('./src/scenes/others.js');
const menuScene = require('./src/scenes/menuS');
const checkMember = require('./src/controllers/memberCheck');
const cancelOrder = require("./src/controllers/closeScene");
const telegram = require('./src/schemas/telegram');
const connect = require('./src/database/connect');
require('dotenv').config()
const bot = new Telegraf(process.env.TOKEN);

bot.telegram.setMyCommands(
  [
    {
      "command": "menu",
      "description": "Abre o menu de compra"
    }, {
      "command": "fechar",
      "description": "Cancela a operação de compra"
    }
  ],
  { scope: { type: 'all_private_chats' } })
  
const stage = new Scenes.Stage([menuScene, comprar, milhasScene, vouWallScene, vcScene, otherScene]);
bot.use(session());
bot.use(stage.middleware());
bot.use(checkMember);
bot.start((ctx) => {
  ctx.scene.enter('menu');
}
);
bot.hears([/menu/i], (ctx) => {
  ctx.scene.enter('menu');
});
bot.command('menu', (ctx) => {
  ctx.scene.enter('menu');
});
bot.action('menu', ctx => {
  ctx.scene.enter('menu');
});


stage.scenes.forEach(scene => {
  scene.on('message', (ctx, next) => {
    if (ctx.message.text && ctx.message.text.toLowerCase().includes('fechar')) {
      ctx.session.messageIds.push(ctx.message.message_id);
      cancelOrder(ctx);
    } else {
      // check if the messageIds array exists in the session
      if (!ctx.session.messageIds) {
        ctx.session.messageIds = [];
      }
      // check if the current update is a message or a message from the bot
      if (ctx.updateType === 'message' || (ctx.updateType === 'channel_post' && ctx.message && ctx.message.from && ctx.message.from.is_bot)) {
        ctx.session.messageIds.push(ctx.message.message_id);
      }

      next();
    }
  });
});
bot.on('new_chat_members', (ctx) => {
  console.log(ctx.chat.id);
  const member = ctx.message.new_chat_members[0].username || ctx.message.new_chat_members[0].first_name;
  bot.telegram.getMe().then((botInfo) => {
    const botUsername = botInfo.username;
    bot.telegram.sendMessage(channelID, `@${member} Bem-vindo(a) ao GRUPO! Caso queira anunciar uma compra, envie uma mensagem privada para @${botUsername} clicando em /start.`)
      .catch((error) => {
        console.error(error);
        //bot.telegram.sendMessage(channelID, `ATENÇÃO @${member} Ocorreu um erro, preciso que aperta "/start" no meu privado!(@${botUsername}).`);
      });
  });
});


bot.launch();
console.log('Bot está online.');


process.on('uncaughtException', (err) => {
  console.log('Erro não capturado: ', err);
});

process.on('unhandledRejection', (err) => {
  if (err !== 'TelegramError: 400: Bad Request: message to delete not found') {
    console.log('Promessa não tratada:', err);
  }
});
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
module.exports = bot;