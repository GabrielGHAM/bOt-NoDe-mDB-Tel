const telegram = require("../schemas/telegramOther");

module.exports = async function save(name, oReais, qtdMilhas, otherP) {

  const s = new telegram({
    name: name,
    valorM: oReais,
    quantidadeDeMilhas: qtdMilhas,
    loyalty: otherP,
  });

  await s.save();

};