const WizardScene = require('telegraf/scenes/wizard');
const telegraf = require('telegraf');
const replyClosed = require("../controllers/replyFechar");
const cancelOrder = require("../controllers/closeScene");
const formatCurrency = require("../controllers/formatValor");
const saveVw = require("../database/databaseWallet");
const optionName = require("../controllers/optionName");
const { channelID } = require("../util/config.json");
const orderConf = require("../controllers/orderConf");


const vouWallScene = new WizardScene(
    'vouWall',



    (ctx) => {

        if (ctx.session.programa.toLowerCase().includes("fechar")) {
            cancelOrder(ctx, bot);
            return;
        }

        const programa = ctx.session.programa.toLowerCase();





        ctx.wizard.state.data = {};

        if (programa === "azul_voucher_rt" || programa === "tap_voucher") {
            replyClosed(ctx, ` Quɑl o vɑloɾ do Voucheɾ?`);
            return ctx.wizard.next();
        } else {
            replyClosed(ctx, ' Quɑl o vɑloɾ dɑ Wɑllet?.',);
            return ctx.wizard.next();
        }
    },

    (ctx) => {


        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data === 'close') {
            return cancelOrder(ctx);
          }


        ctx.wizard.state.data.valVw = ctx.message.text.replace(/,/g, '.');

        if (isNaN(ctx.wizard.state.data.valVw)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido");
        }

        replyClosed(ctx, " Iɾɑ́ utilizɑɾ quɑntos CPFs?",);
        return ctx.wizard.next();
    },

    (ctx) => {

        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data === 'close') {
            return cancelOrder(ctx);
          }


        ctx.wizard.state.data.cpf = ctx.message.text;

        if (isNaN(ctx.wizard.state.data.cpf)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
        };
        replyClosed(ctx, " Digite ɑ % do Desɑ́gio.",);
        return ctx.wizard.next();
    },

    (ctx) => {

        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data === 'close') {
            return cancelOrder(ctx);
          }

        ctx.wizard.state.data.desagio = ctx.message.text
        if (isNaN(ctx.wizard.state.data.desagio)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
        };


        if (ctx.message.text.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }

        replyClosed(ctx, ` Algumɑ obseɾvɑçɑ̃o? \nCɑso nɑ̃o tenhɑ digite "Nɑ̃o"`,);
        return ctx.wizard.next()
    },


    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data === 'close') {
            return cancelOrder(ctx);
          }
          
        ctx.wizard.state.data.obs = ctx.message.text;
        const programa = ctx.session.programa;
        const name = ctx.session.username
        ctx.wizard.state.data.valVw = formatCurrency(ctx.wizard.state.data.valVw);
        const { valVw, cpf, desagio, obs } = ctx.wizard.state.data;
        saveVw(name, programa, valVw, desagio)

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


);
module.exports = vouWallScene;