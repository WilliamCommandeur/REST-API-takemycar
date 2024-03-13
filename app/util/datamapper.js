module.exports = {
    generateUpdateQuery(body, id, tableName) {
        const fieldsAndPlaceholders = [];
        const values = [];
        Object.entries(body).forEach(([prop, value], index) => {
            fieldsAndPlaceholders.push(`${prop} = $${index + 1}`);
            const insertValue = Array.isArray(value) ? `${value}` : value;
            values.push(insertValue)
        });
        values.push(id)
        const text = `UPDATE "${tableName}" SET ${fieldsAndPlaceholders} WHERE id = $${values.length} RETURNING *;`;
        const sqlQuery = {text, values}
        return sqlQuery; 
    }
}