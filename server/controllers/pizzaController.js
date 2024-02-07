const Pizza = require('../models/Pizza');

module.exports = {
  // Create Pizza
  async createPizza(req, res) {
    try {
      const pizzaData = await Pizza.create(req.body);
      res.json(pizzaData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Update Pizza
  async updatePizza(req, res) {
    try {
      const updatedPizza = await Pizza.findByIdAndUpdate(
        { _id: req.params.pizzaId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedPizza) {
        return res.status(404).json({ message: 'No pizza with that ID' });
      }
      res.json(updatedPizza);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete Pizza
  async deletePizza(req, res) {
    try {
      const deletedPizza = await Pizza.findByIdAndDelete(req.params.pizzaId);
      if (!deletedPizza) {
        return res.status(404).json({ message: 'No pizza with that ID' });
      }
      res.json({ message: 'Pizza deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Get all Pizzas
  async getPizzas(req, res) {
    try {
      const pizzas = await Pizza.find();
      res.json(pizzas);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
