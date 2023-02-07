const WizardScene = require('telegraf/scenes/wizard');
const programas = require("./programas");
const firstQ = require("./firstQ");
const secQ = require("./secQ");
const thirdQ = require('./thirdQ');
const fourthQ = require('./fourthQ');
const fifthQ = require('./fifthQ');
const sixthQ = require('./sixthQ');
const telegraf = require('telegraf')



const superWizard = new WizardScene(
  'comprar',

  

  
  ctx => {
    
    programas(ctx);

    ctx.wizard.state.data = {};
    return ctx.wizard.next();

  }, ctx => {
    
    let loyalty;

    try {
      loyalty = ctx.wizard.state.data.programa = ctx.message.text
    } catch (e) {
      console.error(e);
    };

    firstQ(ctx, loyalty);
  }, ctx => {

    let loyalty = ctx.wizard.state.data.programa.replace(/ /g,'_');
    let reais;

    try {
      reais = ctx.wizard.state.data.reais = ctx.message.text.replace(/,/g,'.');
    } catch (e) {
      return ctx.reply("A mensagem precisa ser texto");
    };
    let aMiles = ctx.wizard.state.data.milhas = ctx.message.text;
    let otherP = ctx.wizard.state.data.otherP = ctx.message.text.replace(/ /g,'_');

    secQ(ctx, loyalty, reais, aMiles,otherP, );
  }, ctx => {

    let loyalty = ctx.wizard.state.data.programa;
    let CPF = ctx.wizard.state.data.cpf = ctx.message.text;
    let vcValue = ctx.wizard.state.data.vcValue = ctx.message.text.replace(/,/g,'.');
    let oMiles = ctx.wizard.state.data.omilhas = ctx.message.text;
    

    thirdQ(ctx, loyalty, CPF, vcValue, oMiles);

  }, ctx => {

    let loyalty = ctx.wizard.state.data.programa;
    let desagio =  ctx.wizard.state.data.desagio = ctx.message.text;
    let name = ctx.message.from.username || ctx.message.from.first_name;
    let obs = ctx.wizard.state.data.fdobs = ctx.message.text;
    let otherP = ctx.wizard.state.data.otherP;
    let oCPFF = ctx.wizard.state.data.ocpff = ctx.message.text;
    let vcValue = ctx.wizard.state.data.vcValue;
    let mReais = ctx.wizard.state.data.mreais = ctx.message.text.replace(/,/g,'.');

    fourthQ(ctx, loyalty, desagio, name, obs, otherP, oCPFF, vcValue, mReais);


  }, ctx => {
  
    let loyalty = ctx.wizard.state.data.programa;
    let desagio =  ctx.wizard.state.data.desagio
    let name = ctx.message.from.username || ctx.message.from.first_name;
    let obs = ctx.wizard.state.data.fdobs = ctx.message.text;
    let CPF = ctx.wizard.state.data.cpf;
    let reais = ctx.wizard.state.data.reais;
    let aMiles = ctx.wizard.state.data.milhas;
    let mReais = ctx.wizard.state.data.mreais;
    let oReais = ctx.wizard.state.data.oreais = ctx.message.text.replace(',', '.');
    let obsM = ctx.wizard.state.data.obsM = ctx.message.text;
    fifthQ(ctx, loyalty, desagio, name, obs, CPF, reais, aMiles, mReais, oReais, obsM)

  }, ctx => {
    
    let name = ctx.message.from.username || ctx.message.from.first_name;
    let obs = ctx.wizard.state.data.fdobs = ctx.message.text;
    let otherP = ctx.wizard.state.data.otherP;;
    let oMiles = ctx.wizard.state.data.omilhas;
    let loyalty = ctx.wizard.state.data.programa;
    let oCPFF = ctx.wizard.state.data.ocpff;
    let oReais = ctx.wizard.state.data.oreais;
    

    sixthQ(ctx, name, obs, oCPFF, otherP, oReais, oMiles, loyalty)
  }



);

module.exports = superWizard;