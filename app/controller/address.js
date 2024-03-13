const controllerUtil = require('../util/controller');
const { addressDatamapper } = require('../datamapper');

module.exports = {
  /**
   * Récupération de toutes les addresses
   */
  async getAddresses(_, res, next) {
    const { result, error } = await addressDatamapper.findAddresses();
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Récupération d'une addresse par son ID
   * @param {*} req Requête d'Express
   * @param {*} res Réponse d'Express
   * @param {*} next 
   */
  async getAddressById(req, res, next) {
    const addressId = req.params.id;
    const { result, error } = await addressDatamapper.findAddressById(addressId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Ajout d'une addresse
   */
  async addAddress(req, res, next) {
    const address = req.body;
    const {result, error} = await addressDatamapper.insertAddress(address);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Suppression d'une addresse par son ID
   */
  async deleteAddress(req, res, next) {
    const addressId = req.params.id;
    const { result, error } = await addressDatamapper.destroyAddress(addressId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Modification d'une addresse par son ID
   */
  async modifyAddress(req, res, next) {
    const addressId = req.params.id;
    const address = req.body;
    const { result, error } = await addressDatamapper.updateAddress(addressId, address);
    controllerUtil.manageResponse(error, result, res, next);
  },

};
