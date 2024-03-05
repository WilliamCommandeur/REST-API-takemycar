const {Router} = require('express');
const userRouter = require('./user');

const router = Router();

router.use(userRouter);

router.get('/', (req, res) => {
    res.send(`<h1>Bienvenue sur l'API TakeMyCar</h1>`);
})
module.exports = router;

