const telegram = require("../schemas/telegramVc");

module.exports = async function save(name, otherP, vcValue) {

  const s = new telegram({
    name: name,
    loyalty: otherP,
    valorDaConta: vcValue
  });

  await s.save();

};