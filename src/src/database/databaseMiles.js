const telegram = require("../schemas/telegram");

module.exports = async function save(name, valorM, milhas, programa) {

  const s = new telegram({
    name: name,
    valorM: valorM,
    quantidadeDeMilhas: milhas,
    loyalty: programa,
  });

  await s.save();

};