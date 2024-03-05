const controllerUtil = require('../util/controller');
const {userDatamapper} = require('../datamapper');

module.exports = {
    async getUsers(req, res, next){
        
        const {result, error} = await userDatamapper.findUsers();
        controllerUtil.manageResponse(error, result, res, next);
        
    }
}