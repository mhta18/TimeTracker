const pool = require("../../config/db");


// =========================
// Admin
// =========================

async function createTeam(name, supervisorId) {

    const result = await pool.query(
        `
        INSERT INTO teams
        (name, supervisor_id)

        VALUES($1,$2)

        RETURNING *;
        `,
        [name, supervisorId]
    );

    return result.rows[0];
}


async function getTeams() {

    const result = await pool.query(
        `
        SELECT
            teams.*,
            users.username AS supervisor
        FROM teams

        JOIN users
        ON teams.supervisor_id = users.id

        ORDER BY teams.id;
        `
    );

    return result.rows;
}


async function getTeamById(id) {

    const result = await pool.query(
        `
        SELECT
            teams.*,
            users.username AS supervisor

        FROM teams

        JOIN users
        ON teams.supervisor_id = users.id

        WHERE teams.id = $1;
        `,
        [id]
    );

    return result.rows[0];
}


async function updateTeam(id, name, supervisorId) {

    const result = await pool.query(
        `
        UPDATE teams

        SET
            name = $1,
            supervisor_id = $2

        WHERE id = $3

        RETURNING *;
        `,
        [
            name,
            supervisorId,
            id
        ]
    );

    return result.rows[0];
}


async function deleteTeam(id) {

    const result = await pool.query(
        `
        DELETE FROM teams

        WHERE id = $1

        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
}


// =========================
// Supervisor
// =========================


// Verify supervisor owns the team
async function checkSupervisorOwnsTeam(teamId, supervisorId) {

    const result = await pool.query(
        `
        SELECT *

        FROM teams

        WHERE
            id = $1
        AND supervisor_id = $2;
        `,
        [
            teamId,
            supervisorId
        ]
    );

    return result.rows[0];
}


// Verify member exists
async function checkUserExists(userId) {

    const result = await pool.query(
        `
        SELECT *

        FROM users

        WHERE id = $1;
        `,
        [userId]
    );

    return result.rows[0];
}


// Check member isn't already in team
async function memberExists(teamId, userId) {

    const result = await pool.query(
        `
        SELECT *

        FROM team_members

        WHERE
            team_id = $1
        AND user_id = $2;
        `,
        [
            teamId,
            userId
        ]
    );

    return result.rows[0];
}


async function addMember(teamId, userId) {

    const result = await pool.query(
        `
        INSERT INTO team_members
        (team_id,user_id)

        VALUES($1,$2)

        RETURNING *;
        `,
        [
            teamId,
            userId
        ]
    );

    return result.rows[0];
}


async function removeMember(teamId, userId) {

    const result = await pool.query(
        `
        DELETE FROM team_members

        WHERE
            team_id=$1
        AND user_id=$2

        RETURNING *;
        `,
        [
            teamId,
            userId
        ]
    );

    return result.rows[0];
}


module.exports = {

    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam,

    checkSupervisorOwnsTeam,
    checkUserExists,
    memberExists,
    addMember,
    removeMember

};