const connection = require('../config/connection');
const {Toppings, Pizza }= require('../models/');
const { toppings, pizzas } = require('./data');


// mongoDB connection
connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.once('open', async () => {
  console.log('Connected to MongoDB!');

  let toppingsCheck = await connection.db.listCollections({ name: 'toppings' }).toArray();
  if (toppingsCheck.length) {
    await connection.dropCollection('toppings');
  }

  let pizzasCheck = await connection.db.listCollections({ name: 'pizzas' }).toArray();
  if (pizzasCheck.length) {
    await connection.dropCollection('pizzas');
  }
  
  try {
    // Insert toppings into the database
    const insertedToppings = await Toppings.insertMany(toppings);

    // Create a mapping of topping names to their ObjectId values
    const toppingMap = {};
    insertedToppings.forEach(topping => {
      toppingMap[topping.name] = topping._id;
    });

    // Modify pizzas data to replace topping names with ObjectId values
    const pizzasWithToppings = pizzas.map(pizza => ({
      ...pizza,
      toppings: pizza.toppings.map(toppingName => toppingMap[toppingName])
    }));

    // Insert pizzas into the database
    await Pizza.insertMany(pizzasWithToppings);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.close(); // Disconnect from the database after seeding
  }
});