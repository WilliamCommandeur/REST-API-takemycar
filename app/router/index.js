const { Router } = require('express');
const errorService = require('../service/error');
const userRouter = require('./user');
const vehicleRouter = require('./vehicle');
const addressRouter = require('./address');
const reviewRouter = require('./review');

const router = Router();

router.use(userRouter);
router.use(vehicleRouter);
router.use(addressRouter);
router.use(reviewRouter);

router.get('/', (req, res) => {
  res.send('<h1>Bienvenue sur l\'API TakeMyCar</h1>');
});

router.use(errorService._404);

router.use(errorService.manageError);

module.exports = router;
