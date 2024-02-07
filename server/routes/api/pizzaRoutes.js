const router = require('express').Router();
const {
  createPizza,
  updatePizza,
  deletePizza,
  getPizzas,
} = require('../../controllers/pizzaController');

// api/pizzas
router.route('/').get(getPizzas).post(createPizza);

// api/pizzas/:pizzaId
router
.route('/:pizzaId')
.put(updatePizza)
.delete(deletePizza);

module.exports = router;