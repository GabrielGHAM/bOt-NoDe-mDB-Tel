const telegram = require("../schemas/telegramVc");

module.exports = async function save(name, vcProg, valVc) {

  const s = new telegram({
    name: name,
    loyalty: vcProg,
    valorDaConta: valVc
  });

  await s.save();

};