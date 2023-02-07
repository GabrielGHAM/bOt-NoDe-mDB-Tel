const optionName = require("../controllers/optionName");
const { channelID } = require("../util/config.json");
const saveM = require("../database/databaseMiles");
const saveVw = require("../database/databaseWallet");
const cancelOrder = require("../controllers/closeScene");
const orderConf = require("../controllers/orderConf");
const formatCurrency = require("../controllers/formatValor")
const replyWmark = require("../controllers/replyMarkD");



module.exports = async function fifth(ctx, loyalty, desagio, name, obs, CPF, reais, aMiles, mReais, oReais, obs) {
    

    //Fechar
    if (ctx.message.text.toLowerCase().includes("fechar")) {
        cancelOrder(ctx);
        return;
    }

    // Outros
    if (loyalty === "outros") {
        if (isNaN(oReais)) {
            return replyWmark(ctx, "❌ *Digite um númeɾo vɑ́lido*", );
        }
        replyWmark(ctx, `👀 *Algumɑ obseɾvɑçɑ̃o? \n\nCɑso nɑ̃o tenhɑ digite "Nɑ̃o"*`)
        return ctx.wizard.next();
    }

    // Wallet Voucher sem OBS
    if (loyalty.toLowerCase().includes("latam_wallet") || loyalty.toLowerCase().includes("azul_voucher_ rt")|| loyalty.toLowerCase().includes("tap_voucher")) {
        reais = formatCurrency(reais);
        await saveVw(name, loyalty, reais, desagio)

        if (/^(n[aã]o)$/i.test(obs)) {
            ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${loyalty} \n\n ${reais} \n\n ${desagio} % \n\n ${CPF} CPF </b>`, {
                parse_mode: 'HTML',
                ...optionName(name)
              })
                .then(orderConf(ctx));
            return ctx.scene.leave();
        };
        //Wallet and Voucher; com OBS
        ctx.telegram.sendMessage(channelID, `<b> @${name} \n\ #${loyalty}  \n\n ${reais} \n\n ${desagio} % \n\ ${CPF} CPF \n\n Obs: ${obs}</b>`, {
            parse_mode: 'HTML',
            ...optionName(name)
          })
            .then(orderConf(ctx));
        return ctx.scene.leave();
    };

    //Pontos sem OBS;
    mReais = formatCurrency(mReais);
    const qtdMilhas = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 20 }).format(aMiles);
    await saveM(name, loyalty, qtdMilhas, mReais);


    if (loyalty.toLowerCase().includes("esfera") || loyalty.toLowerCase().includes("livelo") || loyalty.toLowerCase().includes("iupi") || loyalty.toLowerCase().includes("carbon")) {

        if (/^(n[aã]o)$/i.test(obs)) {

            ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${loyalty} \n\n ${qtdMilhas} pontos  \n\n ${CPF} CPF \n\n ${mReais}</b>`, {
                parse_mode: 'HTML',
                ...optionName(name)
              })
                .then(orderConf(ctx));
            return ctx.scene.leave()
        };
        //Pontos com OBS;
        ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${loyalty} \n\n ${qtdMilhas} pontos \n\n🪪 ${CPF} CPF \n\n ${mReais} \n\n Obs: ${obs}</b>`, {
            parse_mode: 'HTML',
            ...optionName(name)
          })
            .then(orderConf(ctx));
        return ctx.scene.leave();

    };

    //Milhas sem OBS

    if (/^(n[aã]o)$/i.test(obs)) {

        ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${loyalty} \n\n ${qtdMilhas} milhas  \n\n ${CPF} CPF \n\n ${mReais}</b>`, {
            parse_mode: 'HTML',
            ...optionName(name)
          }).then(orderConf(ctx));
        return ctx.scene.leave()
    };
    //Milhas com OBS;
    ctx.telegram.sendMessage(channelID, `<b> @${name} \n\n #${loyalty} \n\n ${qtdMilhas} milhas \n\n ${CPF} CPF \n\n ${mReais} \n\n Obs: ${obs}</b>`, {
        parse_mode: 'HTML',
        ...optionName(name)
      })
        .then(orderConf(ctx));
    return ctx.scene.leave();

}

