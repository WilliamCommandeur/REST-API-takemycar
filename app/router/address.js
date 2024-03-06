const {Router} = require('express');
const {addressController} = require('../controller');

const router = Router();

router.get('/addresses', addressController.getAddresses);
router.get('/addresses/:id', addressController.getAddressById);

// router.post('/addresses', addressController.addAddress);
// router.patch('/addresses/:id', addressController.modifyAddress);
// router.delete('/addresses/:id', addressController.deleteAddress);

module.exports = router;