const { Telegraf, Scenes } = require('telegraf');
const cancelOrder = require("../controllers/closeScene");
const getHiddenLink = require('../controllers/imgFormat');
const { startTimer, cancelTimer } = require('../controllers/startTimer');
const bot = require('../../index');
const replyClosed = require("../controllers/replyFechar");
const superWizard = new Scenes.WizardScene(
    'comprar',
    async (ctx) => {
        cancelTimer(ctx);
        startTimer(ctx);
        ctx.wizard.state.data = {}
        await ctx.editMessageText(` Qual o programa?\n\n`, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Smiles', callback_data: 'Smiles' }, { text: 'Smiles Teto Diamante', callback_data: 'Smiles_Teto_Diamante' }],
                    [{ text: 'TAP', callback_data: 'TAP' }, { text: 'TAP Voucher', callback_data: 'TAP_Voucher' }],
                    [{ text: 'Latam Wallet', callback_data: 'Latam_Wallet' }, { text: 'Latam', callback_data: 'Latam' }],
                    [{ text: 'Azul Voucher RT', callback_data: 'Azul_Voucher_RT' }, { text: 'Azul Interline', callback_data: 'Azul_Interline' }],
                    [{ text: 'Avios Ibéria', callback_data: 'Avios_Ibéria' }, { text: 'AeroMexico', callback_data: 'AeroMexico' }],
                    [{ text: 'Volta Cancelada', callback_data: 'Volta_Cancelada' }, { text: 'United', callback_data: 'United' }],
                    [{ text: 'American Airlines', callback_data: 'American_Airlines' }, { text: 'Outros', callback_data: 'Outros' }]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });

        ctx.wizard.next()
    },
    async (ctx) => {
        cancelTimer(ctx);
        if (ctx.callbackQuery) {
            ctx.session.programa = ctx.callbackQuery.data;
        }
        if (ctx.message && ctx.message.text) {
            if (/^[a-zA-Z\s]+$/.test(ctx.message.text)) {
                ctx.session.programa = ctx.message.text.replace(/ /g, '_');
            } else {
                await replyClosed(ctx, 'Por favor, digite somente letras.');
                return;
            }
        }
    // const programa = ctx.session.programa.toLowcase()
    ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.firstMessageId)
        switch (ctx.session.programa.toLowerCase()) {
            case 'tap_voucher':
            case 'latam_wallet':
            case 'azul_voucher_rt':
                return ctx.scene.enter('vouWall');
            case 'outros':
                return ctx.scene.enter('outros');
            case 'volta_cancelada':
                return ctx.scene.enter('voltaCan');
                default:
                return ctx.scene.enter('milhas');                
        }
    },
)

module.exports = superWizard;