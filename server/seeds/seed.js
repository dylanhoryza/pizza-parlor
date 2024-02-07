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
    // Insert pizzas
    await Pizza.insertMany(pizzas);
    // Insert Toppings
    await Toppings.insertMany(toppings);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.close(); // Disconnect from the database after seeding
  }
});