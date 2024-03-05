const controllerUtil = require('../util/controller');
const {userDatamapper} = require('../datamapper');

module.exports = {
    async getUsers(req, res, next){
        const {result, error} = await userDatamapper.findUsers();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getUserById(req, res, next){
        const userId = req.params.id;
        const {result, error} = await userDatamapper.findUserById(userId);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async deleteUser(req, res, next){
        const userId = req.params.id;
        const {result, error} = await userDatamapper.destroyUser(userId);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async addUser(req, res, next){
        const user = req.body;
        const {result, error} = await userDatamapper.insertUser(user);
        controllerUtil.manageResponse(error, result, res, next);
    }    
}