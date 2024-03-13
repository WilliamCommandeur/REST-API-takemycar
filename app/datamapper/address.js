const client = require('../database/client');
const APIError = require('../service/error/APIError');
const datamapperUtil = require('../util/datamapper');

module.exports = {
  async findAddresses() {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM address;';
      const response = await client.query(sqlQuery);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async findAddressById(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM address WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = new APIError(err, 500);
    }
    return { result, error };
  },

  async insertAddress(body) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM insert_address($1);';
      const values = [body];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async destroyAddress(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'DELETE FROM "address" WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = !!response.rowCount;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async updateAddress(body, id) {
    let result;
    let error;
    try {
      const tableName = 'address';
      const sqlQuery = datamapperUtil.generateUpdateQuery(id, body, tableName);
      console.log(sqlQuery);
      const response = await client.query(sqlQuery);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },
};
