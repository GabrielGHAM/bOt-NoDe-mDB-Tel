const { Telegraf, Scenes, Markup } = require('telegraf');
const getHiddenLink = require('../controllers/imgFormat');
const menuFunc = require('../controllers/menuFunc');
const { startTimer, cancelTimer } = require('../controllers/startTimer');



const menuScene = new Scenes.WizardScene(
    'menu',


    async (ctx) => {
        const menuMessage = await ctx.replyWithHTML(menuFunc(ctx), Markup.inlineKeyboard([
            [Markup.button.callback('Outras opções', 'other')],
            [Markup.button.callback('Oferta de compra', 'comprar')],
        ]).resize());

        if (ctx.callbackQuery && ctx.callbackQuery.message) {

            ctx.session.firstMessageId = menuMessage.message_id;
        } else {
            ctx.session.firstMessageId = menuMessage.message_id;
        }
        cancelTimer(ctx);
        startTimer(ctx);
        return ctx.wizard.next();
    },
    (ctx) => {
        cancelTimer(ctx);
        if (ctx.callbackQuery && ctx.callbackQuery.message) {
            switch (ctx.update.callback_query.data) {
                case 'other':
                    return otherMenu(ctx);
                case 'comprar':
                    cancelTimer(ctx);
                    return ctx.scene.enter('comprar');
                default:
                    return ctx.scene.leave();
            }
        }
    },
    (ctx) => {
        cancelTimer(ctx);
        startTimer(ctx);
        if (ctx.callbackQuery && ctx.callbackQuery.message) {
            if (ctx.update.callback_query.data === 'back') {
                ctx.editMessageText(menuFunc(ctx), {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Outras opções', callback_data: 'other' },],
                            [{ text: 'Oferta de compra', callback_data: 'comprar' },]
                        ]
                    }
                });
                return ctx.wizard.selectStep(1);
            }
        }
    });



function otherMenu(ctx) {
    cancelTimer(ctx);
    startTimer(ctx);
    const userFirstName = ctx.chat.first_name;
    ctx.editMessageText(
        `<b>${userFirstName} </b>, seja bem-vindo(a) ao menu de Outras opções!\n\n` +
        `${getHiddenLink("HTML")}`,
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Fale com o ADM', url: 'https://t.me/nsamaral' }],
                    [{ text: 'Indicações ao GRUPO', url: 'http://bit.ly/form-compromilhas' }],
                    [{ text: 'REGRAS do grupo', url: 'https://t.me/c/1662660137/3' }],
                    [{ text: 'Voltar', callback_data: 'back' }]
                ]
            }
        }

    ); return ctx.wizard.next();
}

module.exports = menuScene