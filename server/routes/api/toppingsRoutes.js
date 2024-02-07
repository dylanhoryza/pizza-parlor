const router = require('express').Router();
const {
  createTopping,
  updateTopping,
  deleteTopping,
  getToppings,
} = require('../../controllers/toppingsController');

// api/toppings
router.route('/').get(getToppings).post(createTopping);

//api/toppings/:toppingId
router
  .route('/:toppingId')
  .put(updateTopping)
  .delete(deleteTopping);

module.exports = router;