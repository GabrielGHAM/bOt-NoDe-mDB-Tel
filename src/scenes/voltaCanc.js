const { Telegraf, Scenes  } = require('telegraf');
const replyClosed = require("../controllers/replyFechar");
const cancelOrder = require("../controllers/closeScene");
const formatCurrency = require("../controllers/formatValor");
const optionName = require("../controllers/optionName");
const { channelID } = require("../util/config.json");
const orderConf = require("../controllers/orderConf");
const saveVc = require("../database/databaseVc");
const { startTimer, cancelTimer } = require('../controllers/startTimer');


const vcScene = new Scenes.WizardScene(
    'voltaCan',

    async  (ctx) => {

        ctx.wizard.state.data = {};
        cancelTimer(ctx);
        startTimer(ctx);

        await replyClosed(ctx, ' Digite o nome do pɾogɾɑmɑ.');
        return ctx.wizard.next();

    },
    async  (ctx) => {
        cancelTimer(ctx);
        startTimer(ctx);

        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.vcProg = ctx.message.text.replace(/ /g, '_');
            await replyClosed(ctx,`Você escolheu <b>${ctx.session.programa}</b>!\nPara cancelar digite <b>Fechar</b> a qualquer momento.`)
            await replyClosed(ctx, "Qual o valor está disposto a pagar?",);
            return ctx.wizard.next();

        }
    },
    async (ctx) => {
        cancelTimer(ctx);
        startTimer(ctx);

        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.valVc = ctx.message.text.replace(/,/g, '.');

            if (isNaN(ctx.wizard.state.data.valVc)) {
                return await replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
            }

            await replyClosed(ctx, ` Algumɑ obseɾvɑçɑ̃o? \nCɑso nɑ̃o tenhɑ digite "Nɑ̃o`,);
            return ctx.wizard.next();
        }
    },
    async (ctx) => {
        cancelTimer(ctx);
     

        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.obs = ctx.message.text;

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
            ctx.telegram.sendMessage(channelID, `@${name} \n #Volta_Cancelada \n #${vcProg} \n  ${valVc} \n Obs: ${obs}`, optionName(ctx, name)
            ).then(orderConf(ctx));
            return ctx.scene.leave();

        }

    });
module.exports = vcScene;