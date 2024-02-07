const router = require('express').Router();
const toppingsRoutes = require('./toppingsRoutes');

router.use('/toppings', toppingsRoutes);


module.exports = router;