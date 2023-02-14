const WizardScene = require('telegraf/scenes/wizard');
const telegraf = require('telegraf');
const replyClosed = require("../controllers/replyFechar");
const { minMilhas, channelID } = require("../util/config.json");
const cancelOrder = require("../controllers/closeScene");
const formatCurrency = require("../controllers/formatValor");
const saveM = require("../database/databaseMiles");
const optionName = require("../controllers/optionName");
const orderConf = require("../controllers/orderConf");
const bot = require('../..');


const milhasScene = new WizardScene(
    'milhas',


    async (ctx) => {

        if (ctx.session.programa.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }
        const programa = ctx.session.programa.toLowerCase();

        ctx.wizard.state.data = {};

        if (programa.includes("esfera") || programa.includes("livelo") || programa.includes("iupi") || programa.includes("carbon")) {
            replyClosed(ctx, ' Quɑntos pontos desejɑ compɾɑɾ?');
            return ctx.wizard.next();

        } else {
            replyClosed(ctx, " Quɑntɑs milhɑs desejɑ compɾɑɾ?");

            return ctx.wizard.next();
        }



    },
    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
        }
        
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.milhas = ctx.message.text.replace(/,/g, '.');
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.milhas.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }

        if (isNaN(ctx.wizard.state.data.milhas)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido");
        } else if (ctx.wizard.state.data.milhas < minMilhas) {
            return replyClosed(ctx, ` A quɑntidɑde pɾecisɑ seɾ mɑioɾ que ${minMilhas}`);
        }
        replyClosed(ctx, "Iɾɑ́ utilizɑɾ quɑntos CPFs?",);
        return ctx.wizard.next();

    },
    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
            // Don't do anything
        }
        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.cpf = ctx.message.text;
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.cpf.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }

        if (isNaN(ctx.wizard.state.data.cpf)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido");
        }

        replyClosed(ctx, "Qual o valor do milheiro?");
        return ctx.wizard.next();
    },
    (ctx) => {

        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
            // Don't do anything
        }

        if (ctx.message && ctx.message.text) {
            ctx.wizard.state.data.valorM = ctx.message.text.replace(/,/g, '.');
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.valorM.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }

        if (isNaN(ctx.wizard.state.data.valorM)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
        }

        replyClosed(ctx, ` Algumɑ obseɾvɑçɑ̃o? \nCɑso nɑ̃o tenhɑ digite "Nɑ̃o"`,);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
            // Don't do anything
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


        ctx.wizard.state.data.milhas = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 20 }).format(ctx.wizard.state.data.milhas);
        ctx.wizard.state.data.valorM = formatCurrency(ctx.wizard.state.data.valorM);
        const programa = ctx.session.programa;
        const name = ctx.session.username
        const { milhas, cpf, valorM, obs } = ctx.wizard.state.data;
        await saveM(name, programa, milhas, valorM);

        //esfera etc

        if (programa.toLowerCase().includes("esfera".toLowerCase()) || programa.toLowerCase().includes("livelo".toLowerCase()) || programa.toLowerCase().includes("iupi".toLowerCase()) || programa.toLowerCase().includes("carbon".toLowerCase())) {
            if (/^(n[aã]o)$/i.test(obs)) {
                ctx.telegram.sendMessage(channelID, ` @${name} \n #${programa} \n ${milhas} pontos  \n ${cpf} CPF \n ${valorM}`, optionName(ctx, name)
                ).then(orderConf(ctx));
                return ctx.scene.leave();
            }
            // Outros com OBS
            ctx.telegram.sendMessage(channelID, ` @${name} \n #${programa} \n ${milhas} pontos \n ${cpf} CPF \n ${valorM} \n Obs: ${obs}`, optionName(ctx, name)
            ).then(orderConf(ctx));
            return ctx.scene.leave();
        };

        //Milhas Sem OBS;
        if (/^(n[aã]o)$/i.test(obs)) {

            ctx.telegram.sendMessage(channelID, ` @${name} \n #${programa} \n ${milhas} milhas  \n ${cpf} CPF \n ${valorM}`, optionName(ctx, name))
                .then(orderConf(ctx))
            return ctx.scene.leave()
                ;
        }
        //Milhas com OBS;
        ctx.telegram.sendMessage(channelID, ` @${name} \n #${programa} \n ${milhas} milhas \n ${cpf} CPF \n ${valorM} \n Obs: ${obs}`, optionName(ctx, name))
            .then(orderConf(ctx));
        return ctx.scene.leave();
    }

);
module.exports = milhasScene;