const { minMilhas } = require("../util/config.json");
const cancelOrder = require("../controllers/closeScene");
const replyWmark = require("../controllers/replyMarkD");

module.exports = function secQ(ctx, loyalty, reais, aMiles, otherP) {
    
    //Fechar
    if (ctx.message.text.toLowerCase().includes("fechar")) {
        cancelOrder(ctx);
        return;
    }
   

    // Wallet/Voucher
    if (loyalty.toLowerCase().includes("latam_wallet") || loyalty.toLowerCase().includes("azul_voucher_ rt")|| loyalty.toLowerCase().includes("tap_voucher")) {
        if (isNaN(reais)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*");
        }
        replyWmark(ctx, "* Iɾɑ́ utilizɑɾ quɑntos CPFs*?", );
        return ctx.wizard.next();

        // volta_cancelada
    } else if (loyalty.toLowerCase().includes("volta_cancelada")) {
        replyWmark(ctx, " *Quɑl vɑloɾ?*", );
        return ctx.wizard.next();

        // Outros

    } else if (otherP.toLowerCase().includes("esfera") || otherP.toLowerCase().includes("livelo") || otherP.toLowerCase().includes("iupi") || otherP.toLowerCase().includes("carbon")) {
        replyWmark(ctx, ' *Quɑntos pontos desejɑ compɾɑɾ?*', );
        return ctx.wizard.next();

    } else if (loyalty === "outros") {
        replyWmark(ctx, " *Quɑntɑs milhɑs desejɑ compɾɑɾ?*", );
        return ctx.wizard.next();


        //Milhas
    } else {
        if (isNaN(aMiles)) {
            return replyWmark(ctx, " *Digite um númeɾo vɑ́lido*", );
        } else if (aMiles < minMilhas) {
            return replyWmark(ctx, `* A quɑntidɑde pɾecisɑ seɾ mɑioɾ que* ${minMilhas}`);
        }
        replyWmark(ctx, "*🪪Iɾɑ́ utilizɑɾ quɑntos CPFs*", );
        return ctx.wizard.next();
    }
};