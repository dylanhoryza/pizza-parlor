const { Schema, model } = require("mongoose");

const toppingSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})


const Toppings = model('Toppings', toppingSchema);

module.exports = Toppings;