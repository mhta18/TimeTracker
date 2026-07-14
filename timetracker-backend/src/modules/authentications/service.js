const pool = require("../../config/db");

async function findUserByUsername(username) {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    return result.rows[0];
    
}

async function createUser(username, password,role) {
    const result = await pool.query(
        `INSERT INTO users (username, password, role)
        VALUES ($1, $2, $3)
        RETURNING id, username`
        ,
        [username, password,role]
    )
    return result.rows[0];
}

async function getSupervisors() {

    const result = await pool.query(
        `
        SELECT
            id,
            username
        FROM users
        WHERE role='supervisor'
        ORDER BY username;
        `
    );

    return result.rows;

}



module.exports = {
    findUserByUsername,
    getSupervisors,
    createUser
};