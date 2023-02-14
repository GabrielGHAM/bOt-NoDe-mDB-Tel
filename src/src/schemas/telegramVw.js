const mongoose = require("mongoose");

const telegram = new mongoose.Schema({
  name: {
    type: String
  },
  loyalty: {
    type: String
  },
  value: {
    type: String
  },
  desagio: {
    type: String
  } 
}, 
{
  timestamps: true,
});

module.exports = mongoose.model("vWallet", telegram);