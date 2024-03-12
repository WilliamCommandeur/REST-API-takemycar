const { Router } = require('express');
const { vehicleController } = require('../controller');

const router = Router();

router.get('/vehicles', vehicleController.getVehicles);
router.get('/vehicles/:id', vehicleController.getVehicleById);

// router.post('/vehicles', vehicleController.addVehicle);
// router.patch('/vehicles/:id', vehicleController.modifyVehicle);
// router.delete('/vehicles/:id', vehicleController.deleteVehicle);

module.exports = router;
