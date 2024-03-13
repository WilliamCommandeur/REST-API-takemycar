const controllerUtil = require('../util/controller');
const { vehicleDatamapper } = require('../datamapper');

module.exports = {
  /**
   * Récupération de tous les véhicules
   */
  async getVehicles(req, res, next) {
    const { result, error } = await vehicleDatamapper.findVehicles();
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Récupération d'un véhicule par son ID
   * @param {*} req Requête d'Express
   * @param {*} res Réponse d'Express
   * @param {*} next 
   */
  async getVehicleById(req, res, next) {
    const vehicleId = req.params.id;
    const { result, error } = await vehicleDatamapper.findVehicleById(vehicleId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Ajout d'un véhicule
   */
  async addVehicle(req, res, next) {
    const vehicle = req.body;
    const { result, error } = await vehicleDatamapper.insertVehicle(vehicle);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Suppression d'un véhicule par son ID
   */
  async deleteVehicle(req, res, next) {
    const vehicleId = req.params.id;
    const { result, error } = await vehicleDatamapper.destroyVehicle(vehicleId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Modification d'un véhicule par son ID
   */
  async modifyVehicle(req, res, next) {
    const vehicleId = req.params.id;
    const vehicle = req.body;
    const { result, error } = await vehicleDatamapper.updateVehicle(vehicleId, vehicle);
    controllerUtil.manageResponse(error, result, res, next);
  }
};
