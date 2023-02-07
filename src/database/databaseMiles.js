const telegram = require("../schemas/telegram");

module.exports = async function save(name, mReais, qtdMilhas, loyalty) {

  const s = new telegram({
    name: name,
    valorM: mReais,
    quantidadeDeMilhas: qtdMilhas,
    loyalty: loyalty,
  });

  await s.save();

};