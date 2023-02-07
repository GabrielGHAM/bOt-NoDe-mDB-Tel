const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("strictQuery", true);

module.exports = mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Banco de dados online.');
  })
  .catch((e) => {
    console.log('Ocorreu um problema na conexão do banco de dados.')
  });
