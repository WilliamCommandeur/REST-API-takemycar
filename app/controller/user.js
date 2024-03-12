require('dotenv').config();
const bcrypt = require('bcrypt');
const controllerUtil = require('../util/controller');
const { userDatamapper } = require('../datamapper');

module.exports = {
  /**
   * Récupération de tous les utilisateurs
   */
  async getUsers(_, res, next) {
    const { result, error } = await userDatamapper.findUsers();
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Récupération d'un utilisateur par son ID
   * @param {*} req Requête d'Express
   * @param {*} res Réponse d'Express
   * @param {*} next
   */
  async getUserById(req, res, next) {
    const userId = req.params.id;
    const { result, error } = await userDatamapper.findUserById(userId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Suppression d'un utilisateur par son ID
   */
  async deleteUser(req, res, next) {
    const userId = req.params.id;
    const { result, error } = await userDatamapper.destroyUser(userId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Ajout d'un utilisateur
   */
  async addUser(req, res, next) {
    const user = req.body;
    const hash = await bcrypt.hash(user.password, parseInt(process.env.PASSWORD_SALT, 10));
    user.password = hash;
    const { result, error } = await userDatamapper.insertUser(user);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Modification d'un utilisateur par son ID
   */
  async modifyUser(req, res, next) {
    const userId = req.params.id;
    const user = req.body;
    if (user.password) {
      const hash = await bcrypt.hash(user.password, parseInt(process.env.PASSWORD_SALT, 10));
      user.password = hash;
    }
    const { result, error } = await userDatamapper.updateUser(userId, user);
    controllerUtil.manageResponse(error, result, res, next);
  },

};
