const telegram = require("../schemas/telegramOther");

module.exports = async function save(name, otherValue, otherQtd, others) {

  const s = new telegram({
    name: name,
    valorM: otherValue,
    quantidadeDeMilhas: otherQtd,
    loyalty: others,
  });

  await s.save();

};