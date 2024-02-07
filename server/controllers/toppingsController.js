const Toppings = require('../models/Toppings');

module.exports = {
  // Create Topping
  async createTopping(req, res) {
    try {
      const toppingData = await Toppings.create(req.body);
      res.json(toppingData);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // Update Topping
  async updateTopping(req, res) {
    try {
      const updatedTopping = await Toppings.findByIdAndUpdate(
        {_id: req.params.toppingId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedTopping) {
        return res.status(404).json({ message: 'No topping with that ID' });
      }
      res.json(updatedTopping);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // Delete Topping
  async deleteTopping(req, res) {
    try {
      const deletedTopping = await Toppings.findByIdAndDelete(req.params.toppingId);
      if (!deletedTopping) {
        return res.status(404).json({ message: 'No topping with that ID' });
      }
      res.json({ message: 'Topping deleted successfully.' });
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // Get all toppings
  async getToppings(req, res) {
    try {
      const toppings = await Toppings.find();
      res.json(toppings)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}