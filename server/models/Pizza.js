const { Schema, model } = require("mongoose");

const pizzaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  toppings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Toppings'
    }
  ]
});

const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;