const Telegraf = require('telegraf');
const WizardScene = require('telegraf/scenes/wizard');
const cancelOrder = require("../controllers/closeScene");
const getHiddenLink = require('../controllers/imgFormat');

const superWizard = new WizardScene(
    'comprar',
    async (ctx) => {
        ctx.wizard.state.data = {}        
        await ctx.editMessageText(` Qual o programa?\n\n`, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Smiles',
                            callback_data: 'smiles'
                        },
                        {
                            text: 'Smiles Teto Diamante',
                            callback_data: 'smiles_diamante'
                        }
                    ],
                    [
                        {
                            text: 'TAP',
                            callback_data: 'tap'
                        },
                        {
                            text: 'TAP Voucher',
                            callback_data: 'tap_voucher'
                        }
                    ],
                    [
                        {
                            text: 'Latam Wallet',
                            callback_data: 'latam_wallet'
                        },
                        {
                            text: 'Latam',
                            callback_data: 'latam'
                        }
                    ],
                    [
                        {
                            text: 'Azul Voucher RT',
                            callback_data: 'azul_voucher_rt'
                        },
                        {
                            text: 'Azul Interline',
                            callback_data: 'azul_interline'
                        }
                    ],
                    [
                        {
                            text: 'Avios Ibéria',
                            callback_data: 'avios_Ibéria'
                        },
                        {
                            text: 'AeroMéxico',
                            callback_data: 'aeromexico'
                        }
                    ],
                    [
                        {
                            text: 'Volta Cancelada',
                            callback_data: 'volta_cancelada'
                        },
                        {
                            text: 'United',
                            callback_data: 'united'
                        }
                    ],
                    [
                        {
                            text: 'American Airlines',
                            callback_data: 'american_airlines'
                        },
                        {
                            text: 'Outros',
                            callback_data: 'outros'
                        }
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard: true 
            }
        });
        
        ctx.wizard.selectStep(1);
    },
    async (ctx) => {
        

        // Aqui você pode verificar se a mensagem veio de um botão inline ou de texto
        if (ctx.callbackQuery) {
            ctx.session.username = ctx.callbackQuery.from.username;
            ctx.wizard.state.data.programa = ctx.callbackQuery.data;
            ctx.session.programa = ctx.callbackQuery.data.replace(/ /g, '_');
            ctx.editMessageText(`Você escolheu ${ctx.session.programa}!\nVocê pode cancelar a qualquer momento essa oferta digitando "Fechar"`)
        } else if (ctx.message.text) {
            ctx.session.username = ctx.message.from.username
            ctx.wizard.state.data.programa = ctx.message.text;
            ctx.session.programa = ctx.message.text.replace(/ /g, '_');
             ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.message.message_id - 1);
             ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.message.message_id);
            ctx.reply(`Você escolheu ${ctx.session.programa}!\nVocê pode cancelar a qualquer momento essa oferta digitando "Fechar"`)
        }
        if (ctx.session.programa.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }
      
        const  programa = ctx.session.programa;        

        if (programa.toLowerCase().includes('TAP_Voucher'.toLowerCase()) || programa.toLowerCase().includes('Azul_Voucher_RT'.toLowerCase()) || programa.toLowerCase().includes('Latam_Wallet'.toLowerCase())) {
            ctx.scene.enter('vouWall');
        } else if (programa.toLowerCase().includes('Outros'.toLowerCase())) {
            ctx.scene.enter('outros');
        } else if (programa.toLowerCase().includes('Volta_Cancelada'.toLowerCase())) {
            ctx.scene.enter('voltaCan');
        } else {
            ctx.scene.enter('milhas');
        }


        
        return ctx.wizard.next();
    },
)

module.exports = superWizard;