const pool = require('../../config/db');



async function createProject(teamId, name, description, status) {

    if (!name || name.trim() === "") {
        throw {
            status: 400,
            message: "Project name is required."
        };
    }

    const result = await pool.query(
        `
        INSERT INTO projects
        (team_id, name, description, status)

        VALUES
        ($1,$2,$3,$4)

        RETURNING *;
        `,
        [
            teamId,
            name,
            description || null,
            status || "active"
        ]
    );

    return result.rows[0];
}

async function getProjects(role, userId) {

    if(role === "admin") {
        const result = await pool.query(
            `
            SELECT *
            FROM projects
            ORDER BY id DESC;
            `
        );
        return result.rows;
    }
    else {
        const result = await pool.query(
            `
            SELECT *
            FROM projects
            WHERE team_id IN (
                SELECT team_id
                FROM team_members
                WHERE user_id = $1
            )
            ORDER BY id DESC;
            `,
            [userId]
        );
        return result.rows;
    }
}

async function getProjectById(role, userId, projectId) {
    if (role === "admin") {
        const result = await pool.query(
            `
            SELECT *
            FROM projects
            WHERE id = $1;
            `,
            [projectId]
        );
        return result.rows[0];
    } else {
        const query = `
            SELECT *
            FROM projects
            WHERE id = $1
            AND team_id IN (
                SELECT team_id
                FROM team_members
                WHERE user_id = $2
            );
        `;
        const values = [projectId, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

async function updateProject(
    projectId,
    role,
    teamId,
    name,
    description,
    status
) {
   if(role !== "admin") {
        throw {
            status: 403,
            message: "Access denied."
        };
    }

    if (!name || name.trim() === "") {

        throw {
            status: 400,
            message: "Project name is required."
        };

    }

    const result = await pool.query(
        `
        UPDATE projects

        SET

        team_id=$1,
        name=$2,
        description=$3,
        status=$4

        WHERE id=$5

        RETURNING *;
        `,
        [
            teamId,
            name,
            description,
            status,
            projectId
        ]
    );

    return result.rows[0];
}

async function deleteProject(
    projectId,
    role
) {

    if (role !== "admin") {
        throw {
            status: 403,
            message: "Access denied."
        };
    }
    await pool.query(
        `
        DELETE

        FROM projects

        WHERE id=$1;
        `,
        [projectId]
    );

    return {
        message: "Project deleted successfully."
    };
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};