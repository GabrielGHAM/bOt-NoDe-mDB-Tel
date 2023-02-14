const mongoose = require("mongoose");

const telegram = new mongoose.Schema({
  name: {
    type: String
  },
  valorM: {
    type: String
  },
  quantidadeDeMilhas: {
    type: String
  },
  loyalty: {
    type: String
  }
}, 
{
  timestamps: true,
});

module.exports = mongoose.model("Milhas", telegram);