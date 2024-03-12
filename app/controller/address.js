const controllerUtil = require('../util/controller');
const {addressDatamapper} = require('../datamapper');

module.exports = {
    async getAddresses(req, res, next){
        const {result, error} = await addressDatamapper.findAddresses();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getAddressById(req, res, next){
        const addressId = req.params.id;
        const {result, error} = await addressDatamapper.findAddressById(addressId);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async addAddress(req, res, next){
        const address = req.body;
        const {result, error} = await addressDatamapper.insertAddress(address);
        controllerUtil.manageResponse(error, result, res, next);
    }
}