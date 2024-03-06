const client = require('../database/client');
const APIError = require('../service/error/APIError');

module.exports = {

    async findUsers() {
        let result;
        let error;
        try {
            const sqlQuery = `SELECT * FROM "user";`;
            const response = await client.query(sqlQuery);
            result = response.rows;
        } catch(err) {
            error = err;
        }
        return {result, error};
    },

    async findUserById(id){
        let result;
        let error;
        try {
            const sqlQuery = `SELECT * FROM "user" WHERE id=$1;`;
            const values = [id];
            const response = await client.query(sqlQuery, values);
            result = response.rows[0];
        } catch(err) {
            error = new APIError(err, 500);
        }
        return {result, error};
    },

    async destroyUser(id){
        let result;
        let error;
        try {
            const sqlQuery = `DELETE * FROM "user" WHERE id=$1 RETURNING *;`;
            const values = [id];
            const response = await client.query(sqlQuery, values);
            result = response.rows[0];
        } catch(err) {
            error = err;
        }
        return {result, error};
    },

    async insertUser(body){
        let result;
        let error;
        try {
            const sqlQuery = `SELECT * FROM insert_user($1);`
            const values = [body];
            const response = await client.query(sqlQuery, values);
            result = response.rows;
        } catch(err) {
            error = err;
        }
        return {result, error};
    },
}