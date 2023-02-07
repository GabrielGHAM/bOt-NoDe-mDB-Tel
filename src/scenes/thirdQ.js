const cancelOrder = require("../controllers/closeScene");
const { minMilhas } = require("../util/config.json");
const replyWmark = require("../controllers/replyMarkD");

module.exports = async function thirdQ(ctx, loyalty, CPF, vcValue, oMiles) {
    

    if (ctx.message.text.toLowerCase().includes("fechar")) {
        cancelOrder(ctx);
        return;
    }

    //Wallet and Voucher;
    if (loyalty.toLowerCase().includes("latam_wallet") || loyalty.toLowerCase().includes("azul_voucher_ rt") || loyalty.toLowerCase().includes("tap_voucher")){
        if (isNaN(CPF)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*", );
        };
        replyWmark(ctx, " *Digite ɑ % do Desɑ́gio.*", );
        return ctx.wizard.next();

        // volta_cancelada
    } else if (loyalty.toLowerCase().includes("volta_cancelada")){
           
        //vcValue = parseFloat(vcValue);
        if (isNaN(vcValue)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*", );
        }
        replyWmark(ctx, ` *Algumɑ obseɾvɑçɑ̃o? \nCɑso nɑ̃o tenhɑ digite "Nɑ̃o*`, );
        return ctx.wizard.next();
        //Outros
    } else if (loyalty === "outros") {
        if (isNaN(oMiles)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*", );
        } else if (oMiles < minMilhas) {
            return replyWmark(ctx, `* A quɑntidɑde pɾecisɑ seɾ mɑioɾ que* ${minMilhas}`, );
        }
        replyWmark(ctx, "*🪪 Iɾɑ́ utilizɑɾ quɑntos CPFs*", );
        return ctx.wizard.next();

        //Milhas
    } else {
        if (isNaN(CPF)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*", );
        };
        replyWmark(ctx, "* Vɑloɾ do Milheiɾos.*", );
        return ctx.wizard.next();
    }
}