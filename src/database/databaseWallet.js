const telegram = require("../schemas/telegramVw");

module.exports = async function save(name, loyalty, reais, desagio) {

  const s = new telegram({
    name: name,
    loyalty: loyalty,
    value: reais,
    desagio: desagio,
  });

  await s.save();

};