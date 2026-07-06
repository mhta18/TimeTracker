const pool = require("../../config/db");

async function findUserByUsername(username) {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    return result.rows[0];
    
}

async function create(username,password) {
    const result = await pool.query(
        `INSERT INTO (username, password)
        VALUE($1, $2)
        RETURNING id, username`
        ,
        [username, password]
    )
    return result.rows[0];
}

module.exports = {
    getUserByUsername,
    createUser,
};