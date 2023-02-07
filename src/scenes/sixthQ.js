const optionName = require("../controllers/optionName");
const { channelID } = require("../util/config.json");
const saveOt = require("../database/databaseOther");
const cancelOrder = require("../controllers/closeScene");
const orderConf = require("../controllers/orderConf");
const formatCurrency = require("../controllers/formatValor");

module.exports = async function sixthQ(ctx, name, obs, oCPFF, otherP, oReais, oMiles, loyalty) {
    
    //Fechar
    if (ctx.message.text.toLowerCase().includes("fechar")) {
        cancelOrder(ctx);
        return;
    }


    const qtdMilhas = new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 20 }).format(oMiles);
    await saveOt(name, otherP, qtdMilhas, oReais);
    oReais = formatCurrency(oReais);
    if (otherP.toLowerCase().includes("esfera") || otherP.toLowerCase().includes("livelo") || otherP.toLowerCase().includes("iupi") || otherP.toLowerCase().includes("carbon")) {
        const qtdMilhas = new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 20 }).format(oMiles);
        await saveOt(name, otherP, qtdMilhas, oReais);
        // Outros sem OBS
        if (/^(n[aã]o)$/i.test(obs)) {
            ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${otherP} \n\n ${qtdMilhas} pontos  \n\n ${oCPFF} CPF \n\n ${oReais}</b>`,  {
                parse_mode: 'HTML',
                ...optionName(name)
              })
            .then(orderConf(ctx)); 
            return ctx.scene.leave();
        }
        // Outros com OBS
        ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${otherP} \n\n ${qtdMilhas} pontos \n\n ${oCPFF} CPF \n\n ${oReais} \n\n Obs: ${obs}</b>`,  {
            parse_mode: 'HTML',
            ...optionName(name)
          })
        .then(orderConf(ctx)); 
        return ctx.scene.leave();
    };
      
    
    
    
    if (loyalty === "outros") {
        // Outros sem OBS
        if (/^(n[aã]o)$/i.test(obs)) {
            ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${otherP} \n\n ${qtdMilhas} milhas  \n\n🪪 ${oCPFF} CPF \n\n ${oReais}</b>`,   {
                parse_mode: 'HTML',
                ...optionName(name)
              })
            .then(orderConf(ctx)); 
            return ctx.scene.leave();
        }
        // Outros com OBS
        ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${otherP} \n\n ${qtdMilhas} milhas \n\n🪪 ${oCPFF} CPF \n\n ${oReais} \n\n Obs: ${obs}</b>`,   {
            parse_mode: 'HTML',
            ...optionName(name)
          })
        .then(orderConf(ctx)); 
        return ctx.scene.leave();
    }
    
};