const cancelOrder = require("../controllers/closeScene");
const replyWmark = require("../controllers/replyMarkD");
module.exports = function firstQ(ctx, loyalty,) {

  if (loyalty.toLowerCase().includes("fechar")) {
    cancelOrder(ctx);
    return;
  } else if (loyalty.toLowerCase().includes("azul_voucher_rt") || loyalty.toLowerCase().includes("tap_voucher")) {
    replyWmark(ctx, ` *Quɑl o vɑloɾ do Voucheɾ?*`,);
    return ctx.wizard.next();
  } else if (loyalty.toLowerCase().includes("latam_wallet")) {
    replyWmark(ctx, ' *Quɑl o vɑloɾ dɑ Wɑllet?.*',);
    return ctx.wizard.next();
  } else if (loyalty.toLowerCase().includes("volta_cancelada")) {
    replyWmark(ctx, ' *Digite o nome do pɾogɾɑmɑ*.');
    return ctx.wizard.next();
  } else if (loyalty.includes("outros")) {
    replyWmark(ctx, ' *Digite o nome do pɾogɾɑmɑ*.');
    return ctx.wizard.next();
  } else if ((loyalty.toLowerCase()).includes("esfera") || loyalty.toLowerCase().includes("livelo") || loyalty.toLowerCase().includes("iupi") || loyalty.toLowerCase().includes("carbon")) {
    replyWmark(ctx, ' *Quɑntos pontos desejɑ compɾɑɾ?*',);
    return ctx.wizard.next();
  } else {
    replyWmark(ctx, " *Quɑntɑs milhɑs desejɑ compɾɑɾ?*",);
    return ctx.wizard.next();
  }
};