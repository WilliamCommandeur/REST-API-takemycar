const client = require('../database/client');

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
    }
}