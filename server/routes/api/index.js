const router = require('express').Router();
const toppingsRoutes = require('./toppingsRoutes');
const pizzaRoutes = require('./pizzaRoutes');

router.use('/toppings', toppingsRoutes);
router.use('/pizzas', pizzaRoutes)


module.exports = router;