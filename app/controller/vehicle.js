const controllerUtil = require('../util/controller');
const {vehicleDatamapper} = require('../datamapper');

module.exports = {
    async getVehicles(req, res, next){
        const {result, error} = await vehicleDatamapper.findVehicles();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getVehicleById(req, res, next){
        const vehicleId = req.params.id;
        const {result, error} = await vehicleDatamapper.findVehicleById(vehicleId);
        controllerUtil.manageResponse(error, result, res, next);
    }
}