const pool = require('../../config/db');

async function createProjects(userId, name, description, status) {
    const query = `
        INSERT INTO projects (user_id, name, description, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [userId, name, description, status];

    const result = await pool.query(query, values);

    return result.rows[0];
}

async function getProjectsByUserId(userId) {
    const query = `
        SELECT * FROM projects
        WHERE user_id = $1;
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
}


async function getProjectById(projectId) {
    const query = `
        SELECT * FROM projects
        WHERE id = $1;
    `;
    const values = [projectId];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function updateProject(projectId, name, description, status) {
    const query = `
        UPDATE projects
        SET name = $1, description = $2, status = $3
        WHERE id = $4
        RETURNING *;
    `;
    const values = [name, description, status, projectId];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function deleteProject(projectId) {
    const query = `
        DELETE FROM projects
        WHERE id = $1
        RETURNING *;
    `;
    const values = [projectId];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
    createProjects: createProjects,
    getProjectsByUserId,
    getProjectById,
    updateProject,
    deleteProject,
};