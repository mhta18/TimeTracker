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
            status
        ]
    );

    return result.rows[0];
}
async function getProjects(role, userId) {

    let result;

    if (role === "admin") {

        result = await pool.query(
            `
            SELECT *
            FROM projects
            ORDER BY id DESC;
            `
        );

    } else if (role === "supervisor") {

        result = await pool.query(
            `
            SELECT p.*
            FROM projects p

            JOIN teams t
                ON p.team_id = t.id

            WHERE t.supervisor_id = $1

            ORDER BY p.id DESC;
            `,
            [userId]
        );

    } else {

        return [];

    }

    return result.rows;
}

async function getProjectTasks(role, userId, projectId) {

    if (role === "supervisor") {
        const result = await pool.query(
            `
            SELECT
                ta.*,
                u.username AS assigned_username
            FROM tasks ta
            JOIN projects p
                ON ta.project_id = p.id
            JOIN teams t
                ON p.team_id = t.id
            LEFT JOIN users u
                ON ta.assigned_to = u.id
            WHERE
                p.id = $1
                AND t.supervisor_id = $2
            ORDER BY ta.created_at DESC;
            `,
            [projectId, userId]
        );
        return result.rows;
    }
    else if (role === "admin") {

        const result = await pool.query(
            `
            SELECT
                t.*,
                u.username AS assigned_username
            FROM tasks t
            LEFT JOIN users u
                ON u.id = t.assigned_to
            WHERE t.project_id = $1
            ORDER BY t.created_at DESC;
            `,
            [projectId]
        );
        return result.rows;
    } else {
        throw { status: 403, message: "Members cannot access project tasks." };
    }
}

async function getProjectById(projectId) {
    const result = await pool.query(
        `
            SELECT *
            FROM projects
            WHERE id = $1;
            `,
        [projectId]
    );
    return result.rows[0];
}

async function updateProject(
    projectId,
    role,
    teamId,
    name,
    description,
    status
) {
    if (role !== "admin") {
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

async function getTaskTeamMembers(projectId) 
{
    const result = await pool.query(
        `
        SELECT
            u.id,
            u.username
        FROM team_members tm
        JOIN users u
            ON tm.user_id = u.id
        JOIN teams t
            ON tm.team_id = t.id
        JOIN projects p
            ON p.team_id = t.id
        WHERE p.id = $1
        ORDER BY u.username;
        `,
        [projectId]
    );

    return result.rows;

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
    getTaskTeamMembers,
    updateProject,
    deleteProject,
    getProjectTasks
};