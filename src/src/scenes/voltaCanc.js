const WizardScene = require('telegraf/scenes/wizard');
const telegraf = require('telegraf');
const replyClosed = require("../controllers/replyFechar");
const cancelOrder = require("../controllers/closeScene");
const formatCurrency = require("../controllers/formatValor");
const optionName = require("../controllers/optionName");
const { channelID } = require("../util/config.json");
const orderConf = require("../controllers/orderConf");
const saveVc = require("../database/databaseVc");


const vcScene = new WizardScene(
    'voltaCan',

    (ctx) => {

        if (ctx.session.programa.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }

        ctx.wizard.state.data = {};
        
        replyClosed(ctx, ' Digite o nome do pɾogɾɑmɑ.');
        return ctx.wizard.next();

    },
    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
        }
        
        if (ctx.message && ctx.message.text) {            
        ctx.wizard.state.data.vcProg = ctx.message.text.replace(/ /g, '_');
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.vcProg.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }
        replyClosed(ctx, "Qual o valor está disposto a pagar?",);
        return ctx.wizard.next();

    },
    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
        }
        
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.valVc = ctx.message.text.replace(/,/g, '.');
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.valVc.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }
        
        if (isNaN(ctx.wizard.state.data.valVc)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
        }

        replyClosed(ctx, ` Algumɑ obseɾvɑçɑ̃o? \nCɑso nɑ̃o tenhɑ digite "Nɑ̃o`,);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
        }
        
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.obs = ctx.message.text;
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.obs.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }
        
        // Volta Cancela com  OBS
        const name = ctx.session.username
        ctx.wizard.state.data.valVc = formatCurrency(ctx.wizard.state.data.valVc);
        const { vcProg, valVc, obs } = ctx.wizard.state.data;
        await saveVc(name, vcProg, valVc)

        if (/^(n[aã]o)$/i.test(obs)) {
            ctx.telegram.sendMessage(channelID, `@${name} \n #Volta_Cancelada \n #${vcProg} \n  ${valVc}`, optionName(ctx, name)
            ).then(orderConf(ctx));
            return ctx.scene.leave();
        };
        // Volta Cancela sem OBS       
        ctx.telegram.sendMessage(channelID, `<b>@${name} \n #Volta_Cancelada \n #${vcProg} \n  ${valVc} \n Obs: ${obs}</b>`, optionName(ctx, name)
        ).then(orderConf(ctx));
        return ctx.scene.leave();

    }

);
module.exports = vcScene;