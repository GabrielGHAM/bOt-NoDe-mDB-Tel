const telegram = require("../schemas/telegramVw");

module.exports = async function save(name, programa, valVw, desagio) {

  const s = new telegram({
    name: name,
    loyalty: programa,
    value: valVw,
    desagio: desagio,
  });

  await s.save();

};