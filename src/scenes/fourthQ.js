
const optionName = require("../controllers/optionName");
const cancelOrder = require("../controllers/closeScene");
const { channelID } = require("../util/config.json");
const saveVc = require("../database/databaseVc");
const orderConf = require("../controllers/orderConf");
const formatCurrency = require("../controllers/formatValor");
const replyWmark = require("../controllers/replyMarkD");


module.exports = async function firstQ(ctx, loyalty, desagio, name, obs, otherP, oCPFF, vcValue, mReais) {

    //Fechar
    if (ctx.message.text.toLowerCase().includes("fechar")) {
        cancelOrder(ctx);
        return;
    }

    // Outros
    if (loyalty === "outros") {
        if (isNaN(oCPFF)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*",);
        } else {
            replyWmark(ctx, "* Vɑloɾ do Milheiɾos.*",);
            return ctx.wizard.next();
        }
    };

    // Volta Cancela com OBS
    vcValue = formatCurrency(vcValue);
    if (loyalty === "volta_cancelada" && /^(n[aã]o)$/i.test(obs)) {

        await saveVc(name, otherP, vcValue);
        ctx.telegram.sendMessage(channelID, `<b>@${name} \n\n #volta_cancelada \n\n #${otherP} \n\n  ${vcValue}</b>`, {
            parse_mode: 'HTML',
            ...optionName(name)
        })
            .then(orderConf(ctx));
        return ctx.scene.leave();
        // Volta Cancela sem OBS
    } else if (loyalty.toLowerCase().includes("volta_cancelada")) {
        ctx.telegram.sendMessage(channelID, `<b>@${name} \n\n #volta_cancelada \n\n #${otherP} \n\n  ${vcValue} \n\n Obs: ${obs}</b>`, {
            parse_mode: 'HTML',
            ...optionName(name)
        })

            .then(orderConf(ctx));
        return ctx.scene.leave();
    }
    // Wallet/Voucher
    if (loyalty.toLowerCase().includes("latam_wallet") || loyalty.toLowerCase().includes("azul_voucher_ rt") || loyalty.toLowerCase().includes("tap_voucher")) {
        if (isNaN(desagio)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*",);
        } else {
            replyWmark(ctx, ` *Algumɑ obseɾvɑçɑ̃o? \n\nCɑso nɑ̃o tenhɑ digite "Nɑ̃o"*`,);
            return ctx.wizard.next();
        }
        // milhas
    } else {
        if (isNaN(mReais)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*",);
        }

        replyWmark(ctx, ` *Algumɑ obseɾvɑçɑ̃o? \n\nCɑso nɑ̃o tenhɑ digite "Nɑ̃o"*`,);
        return ctx.wizard.next();
    };
}