const { Telegraf, Scenes  } = require('telegraf');
const replyClosed = require("../controllers/replyFechar");
const cancelOrder = require("../controllers/closeScene");
const formatCurrency = require("../controllers/formatValor");
const saveVw = require("../database/databaseWallet");
const optionName = require("../controllers/optionName");
const { channelID } = require("../util/config.json");
const orderConf = require("../controllers/orderConf");
const { startTimer, cancelTimer } = require('../controllers/startTimer');


const vouWallScene =  new Scenes.WizardScene(
    'vouWall',

  async  (ctx) => {

    await replyClosed(ctx,`Você escolheu <b>${ctx.session.programa}</b>!\nPara cancelar digite <b>Fechar</b> a qualquer momento.`)
        ctx.wizard.state.data = {};
        cancelTimer(ctx);
        startTimer(ctx);
        const programa = ctx.session.programa.toLowerCase();
        ctx.wizard.state.data = {};
        if (programa === "azul_voucher_rt" || programa === "tap_voucher") {
            await replyClosed(ctx, ` Quɑl o vɑloɾ do Voucheɾ?`);
            return ctx.wizard.next();
        } else {
            await replyClosed(ctx, ' Quɑl o vɑloɾ dɑ Wɑllet?.',);
            return ctx.wizard.next();
        }
    },

    async (ctx) => {
        cancelTimer(ctx);
        startTimer(ctx);
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.valVw = ctx.message.text.replace(/,/g, '.');
            if (isNaN(ctx.wizard.state.data.valVw)) {
                return await replyClosed(ctx, " Digite um númeɾo vɑ́lido");
            }
            await replyClosed(ctx, " Iɾɑ́ utilizɑɾ quɑntos CPFs?",);
            return ctx.wizard.next();
        }
    },
    async (ctx) => {
        cancelTimer(ctx);
        startTimer(ctx);
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.cpf = ctx.message.text;
            if (isNaN(ctx.wizard.state.data.cpf)) {
                return await replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
            };
            await replyClosed(ctx, " Digite ɑ % do Desɑ́gio.",);
            return ctx.wizard.next();
        }
    },

    async  (ctx) => {
        cancelTimer(ctx);
        startTimer(ctx);
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.desagio = ctx.message.text

            if (isNaN(ctx.wizard.state.data.desagio)) {
                return await replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
            };
            await replyClosed(ctx, ` Algumɑ obseɾvɑçɑ̃o? \nCɑso nɑ̃o tenhɑ digite "Nɑ̃o"`,);
            return ctx.wizard.next()
        }
    },
    async (ctx) => {
        cancelTimer(ctx);
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.obs = ctx.message.text;;

            const programa = ctx.session.programa;
            const name = ctx.session.username
            ctx.wizard.state.data.valVw = formatCurrency(ctx.wizard.state.data.valVw);
            const { valVw, cpf, desagio, obs } = ctx.wizard.state.data;
           await saveVw(name, programa, valVw, desagio)

            if (/^(n[aã]o)$/i.test(obs)) {
                ctx.telegram.sendMessage(channelID, ` @${name} \n #${programa} \n ${valVw} \n ${desagio} % \n ${cpf} CPF `, optionName(ctx, name)
                ).then(orderConf(ctx));
                return ctx.scene.leave();
            };

            //Wallet and Voucher; com OBS
            ctx.telegram.sendMessage(channelID, ` @${name} \n\ #${programa}  \n ${valVw} \n ${desagio} % \n\ ${cpf} CPF \n Obs: ${obs}`, optionName(ctx, name))
                .then(orderConf(ctx));
            return ctx.scene.leave();
        }


    });

module.exports = vouWallScene;