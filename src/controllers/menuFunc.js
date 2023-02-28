const { Markup } = require('telegraf');
const getHiddenLink = require('./imgFormat');

module.exports =  function sendMainMenu(ctx) {
    const firstName = ctx.session.first_name = ctx.from.first_name;
    const botUsername = ctx.botInfo.username
   ctx.session.username = ctx.from.username;
   ctx.session.chatId = ctx.chat.id || ctx.message.chat.id 
    
    return ` Olá <b> ${firstName}</b> Seja bem vindo ao <b>@${botUsername}</b>  \n` +
    `${getHiddenLink("HTML")}`
}