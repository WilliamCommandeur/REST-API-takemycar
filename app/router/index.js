const {Router} = require('express');
const userRouter = require('./user');
const errorService = require('../service/error');

const router = Router();

router.use(userRouter);

router.get('/', (req, res) => {
    res.send(`<h1>Bienvenue sur l'API TakeMyCar</h1>`);
});

router.use(errorService._404);

router.use(errorService.manageError);

module.exports = router;

