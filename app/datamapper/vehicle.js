const client = require('../database/client');
const APIError = require('../service/error/APIError');
const datamapperUtil = require('../util/datamapper');

module.exports = {

  /**
   * Requête pour récupérer tous les véhicules
   * @returns tableau d'objets véhicule
   */
  async findVehicles() {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM vehicle;';
      const response = await client.query(sqlQuery);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  /**
   * Requête pour récupérer un véhicule en fonction de son ID
   * @param {number} id 
   * @returns un objet véhicule
   */
  async findVehicleById(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM vehicle WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = new APIError(err, 500);
    }
    return { result, error };
  },

  /**
   * Ajout d'un véhicule en BDD
   * @param {object} body contenant les infos du véhicules 
   * @returns un objet véhicule
   */
  async insertVehicle(body) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM insert_vehicle($1)';
      const values = [body];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  /**
   * Suppression d'un véhicule en BDD
   * @param {number} id 
   * @returns booléen
   */
  async destroyVehicle(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'DELETE FROM "vehicle" WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = !!response.rowCount;
    } catch (err) { 
      error = err;
    }
    return { result, error };
  },

  /**
   * Modification d'un véhicule en BDD
   * @param {object} body 
   * @param {number} id 
   * @returns un object véhicule
   */
  async updateVehicle(body, id) {
    let result;
    let error;
    try {
      const tableName = 'vehicle';
      const sqlQuery = datamapperUtil.generateUpdateQuery(id, body, tableName);
      const response = await client.query(sqlQuery);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },
};
