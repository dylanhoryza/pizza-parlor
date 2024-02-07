const toppings = [
  {
    name: 'pepperoni'
  },
  {
    name: 'cheese'
  },
  {
    name: 'sausage'
  },
  {
    name: 'mushrooms'
  },
];

const pizzas = [
  {
    name: 'Pepperoni',
    toppings: [
      'pepperoni',
      'cheese'
    ]
  },
  {
    name: 'Cheese',
    toppings: [
      'cheese'
    ],
  },
  {
    name: 'Meat Lovers',
    toppings: [
      'cheese',
      'pepperoni',
      'sausage'
    ],
  },
  {
    name: 'Mushroom Pizza',
    toppings: [
      'cheese',
      'mushrooms'
    ]
  }
];

module.exports = { toppings, pizzas };