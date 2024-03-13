const controllerUtil = require('../util/controller');
const { vehicleDatamapper } = require('../datamapper');

module.exports = {
  async getVehicles(req, res, next) {
    const { result, error } = await vehicleDatamapper.findVehicles();
    controllerUtil.manageResponse(error, result, res, next);
  },

  async getVehicleById(req, res, next) {
    const vehicleId = req.params.id;
    const { result, error } = await vehicleDatamapper.findVehicleById(vehicleId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  async addVehicle(req, res, next) {
    const vehicle = req.body;
    const { result, error } = await vehicleDatamapper.insertVehicle(vehicle);
    controllerUtil.manageResponse(error, result, res, next);
  },

  async deleteVehicle(req, res, next) {
    const vehicleId = req.params.id;
    const { result, error } = await vehicleDatamapper.destroyVehicle(vehicleId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  async modifyVehicle(req, res, next) {
    const vehicleId = req.params.id;
    const vehicle = req.body;
    const { result, error } = await vehicleDatamapper.updateVehicle(vehicleId, vehicle);
    controllerUtil.manageResponse(error, result, res, next);
  }
};
