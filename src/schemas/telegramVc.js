const mongoose = require("mongoose");

const telegram = new mongoose.Schema({
  name: {
    type: String
  },
  loyalty: {
    type: String
  },
  valorDaConta: {
    type: String
  } 
}, 
{
  timestamps: true,
});

module.exports = mongoose.model("voltaCancelada", telegram);