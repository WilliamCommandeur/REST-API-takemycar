const client = require('../database/client');
const APIError = require('../service/error/APIError');

module.exports = {
    async findVehicles() {
        let result;
        let error;
        try {
            const sqlQuery = `SELECT * FROM vehicle;`;
            const response = await client.query(sqlQuery);
            result = response.rows;
        } catch(err) {
            error = err;
        }
        return {result, error};
    },

    async findVehicleById(id){
        let result;
        let error;
        try {
            const sqlQuery = `SELECT * FROM vehicle WHERE id=$1;`;
            const values = [id];
            const response = await client.query(sqlQuery, values);
            result = response.rows[0];
        } catch(err) {
            error = new APIError(err, 500);
        }
        return {result, error};
    },
}