const WizardScene = require('telegraf/scenes/wizard');
const telegraf = require('telegraf');
const replyClosed = require("../controllers/replyFechar");
const { minMilhas, channelID } = require("../util/config.json");
const cancelOrder = require("../controllers/closeScene");
const formatCurrency = require("../controllers/formatValor");
const optionName = require("../controllers/optionName");
const saveOt = require("../database/databaseOther");
const orderConf = require("../controllers/orderConf");

const otherScene = new WizardScene(
    'outros',

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
            ctx.wizard.state.data.others = ctx.message.text.replace(/ /g, '_');
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.others.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }
        

        if ((ctx.wizard.state.data.others.toLowerCase()).includes("esfera".toLowerCase()) || ctx.wizard.state.data.others.toLowerCase().includes("livelo".toLowerCase()) || ctx.wizard.state.data.others.toLowerCase().includes("iupi".toLowerCase()) || ctx.wizard.state.data.others.toLowerCase().includes("carbon".toLowerCase())) {
            replyClosed(ctx, ' Quɑntos pontos desejɑ compɾɑɾ?',);
            return ctx.wizard.next();
        } else {
            replyClosed(ctx, ' Quantas milhas deseja comprar?');
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
        }
        
        if (ctx.message && ctx.message.text) {            
            ctx.wizard.state.data.otherQtd = ctx.message.text.replace(/,/g, '.');
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.otherQtd.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }

       

        if (isNaN(ctx.wizard.state.data.otherQtd)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
        } else if (ctx.wizard.state.data.otherQtd < minMilhas) {
            return replyClosed(ctx, ` A quɑntidɑde pɾecisɑ seɾ mɑioɾ que ${minMilhas}`);
        }
        replyClosed(ctx, "Iɾɑ́ utilizɑɾ quɑntos CPFs?",);
        return ctx.wizard.next();

    },
    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
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
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
        };

        replyClosed(ctx, " Qual o valor do milheiro?",);
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
        }
        
        if (ctx.message && ctx.message.text) {            
            ctx.wizard.state.data.otherValue = ctx.message.text.replace(/,/g, '.');
        } else {
            // Não faça nada se ctx.message.text for undefined
        }
        if (ctx.wizard.state.data.otherValue.toLowerCase().includes("fechar")) {
            cancelOrder(ctx);
            return;
        }

    
        if (isNaN(ctx.wizard.state.data.otherValue)) {
            return replyClosed(ctx, " Digite um númeɾo vɑ́lido",);
        }

        replyClosed(ctx, ` Algumɑ obseɾvɑçɑ̃o? \nCɑso nɑ̃o tenhɑ digite "Nɑ̃o"`,);
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
       
        ctx.wizard.state.data.otherQTD = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 20 }).format(ctx.wizard.state.data.otherQTD);
        ctx.wizard.state.data.otherValue = formatCurrency(ctx.wizard.state.data.otherValue);
        const { others, otherQtd, cpf, otherValue, obs } = ctx.wizard.state.data;
        const name = ctx.session.username
        await saveOt(name, others, otherQtd, otherValue);

        if (others.toLowerCase().includes("esfera".toLowerCase()) || others.toLowerCase().includes("livelo".toLowerCase()) || others.toLowerCase().includes("iupi".toLowerCase()) || others.toLowerCase().includes("carbon".toLowerCase())) {
            if (/^(n[aã]o)$/i.test(obs)) {
                ctx.telegram.sendMessage(channelID, ` @${name} \n #${others} \n ${otherQtd} pontos  \n ${cpf} CPF \n ${otherValue}`, optionName(ctx, name)
                ) .then(orderConf(ctx));
                return ctx.scene.leave();
            }
            // Outros com OBS
            ctx.telegram.sendMessage(channelID, ` @${name} \n #${others} \n ${otherQtd} pontos \n ${cpf} CPF \n ${otherValue} \n Obs: ${obs}`, optionName(ctx, name)
            ) .then(orderConf(ctx));
            return ctx.scene.leave();
        };




        //Milhas Sem OBS;
        if (/^(n[aã]o)$/i.test(obs)) {

            ctx.telegram.sendMessage(channelID, ` @${name} \n #${others} \n ${otherQtd} milhas  \n ${cpf} CPF \n ${otherValue}`, optionName(ctx, name)
            ).then(orderConf(ctx));
            return ctx.scene.leave()
        };
        //Milhas com OBS;
        ctx.telegram.sendMessage(channelID, ` @${name} \n #${others} \n ${otherQtd} milhas \n ${cpf} CPF \n ${otherValue} \n Obs: ${obs}`, optionName(ctx, name)
        )
            .then(orderConf(ctx));
        return ctx.scene.leave();
    }


)
module.exports = otherScene