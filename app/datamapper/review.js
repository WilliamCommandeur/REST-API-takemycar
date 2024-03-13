const client = require('../database/client');
const APIError = require('../service/error/APIError');
const datamapperUtil = require('../util/datamapper');

module.exports = {
  async findReviews() {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM review;';
      const response = await client.query(sqlQuery);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async findReviewById(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM review WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = new APIError(err, 500);
    }
    return { result, error };
  },

  async insertReview(body) {
    let result;
    let error;
    try {
      const sqlQuery = 'SELECT * FROM insert_review($1);';
      const values = [body];
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async destroyReview(id) {
    let result;
    let error;
    try {
      const sqlQuery = 'DELETE FROM "review" WHERE id=$1;';
      const values = [id];
      const response = await client.query(sqlQuery, values);
      result = !!response.rowCount;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async updateReview(body, id) {
    let result;
    let error;
    try {
      const tableName = 'review';
      const sqlQuery = datamapperUtil.generateUpdateQuery(id, body ,tableName);
      const response = await client.query(sqlQuery);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },
};
