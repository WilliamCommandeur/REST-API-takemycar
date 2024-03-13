const client = require('../database/client');
const APIError = require('../service/error/APIError');
const datamapperUtil = require('../util/datamapper');

module.exports = {

  /**
   * Requête pour récupérer tous les utilisateurs
   * @returns tableau d'objets utilisateur
   */
  async findUsers() {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM "user";';
      const response = await client.query(sqlQuery);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  /**
   * Requête pour récuper une utilisateur en fonction de son ID
   * @param {number} id 
   * @returns un objet utilisateur
   */
  async findUserById(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM "user" WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = new APIError(err, 500);
    }
    return { result, error };
  },

  /**
   * Supprime un utilisateur en BDD en fonction de son ID
   * @param {number} id 
   * @returns booléen
   */
  async destroyUser(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'DELETE FROM "user" WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = !!response.rowCount;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  /**
   * Ajout d'un utilisateur en BDD
   * @param {object} body contenant les infos de l'utilisateur 
   * @returns un objet utilisateur
   */
  async insertUser(body) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM insert_user($1);';
      const values = [body];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  /**
   * Modification d'un utilisateur en BDD
   * @param {object} body 
   * @param {number} id 
   * @returns un objet utilisateur
   */
  async updateUser(body, id) {
    let result;
    let error;
    try {
      const tableName = 'user';
      const sqlQuery = datamapperUtil.generateUpdateQuery(id, body, tableName);
      const response = await client.query(sqlQuery);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },
};
