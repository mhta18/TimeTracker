const pool = require("../../config/db");

async function checkProjectOwnership(project_id, user_id) {
    const result = await pool.query(
        `
        SELECT * FROM projects
        WHERE id = $1 AND user_id = $2
        `,
        [project_id, user_id]
    );
    return result.rows[0];
}

async function createTask(project_id, title, description, status, due_date) {
    const result = await pool.query(
        `
        INSERT INTO tasks(project_id,title,description,status,due_date)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [project_id, title, description, status, due_date]
    );

    return result.rows[0];
}

async function getTasks(user_id) {
    const result = await pool.query(
        `
        SELECT
        tasks.*
        FROM tasks
        JOIN projects
        ON tasks.project_id = projects.id
        WHERE projects.user_id=$1;
        `,
        [user_id]
    );

    return result.rows;
}

async function getTaskById(id,user_id) {
    const result = await pool.query(
        `
        SELECT
        tasks.*
        FROM tasks
        JOIN projects
        ON tasks.project_id=projects.id
        WHERE tasks.id=$1
        AND projects.user_id=$2;
        `,
        [id, user_id]
    );

    return result.rows[0];
}

async function updateTask(id, title, description, status, due_date) {
    const result = await pool.query(
        `
        UPDATE tasks
        SET
            title=$1,
            description=$2,
            status=$3,
            due_date=$4
        WHERE id=$5
        RETURNING *
        `,
        [title, description, status, due_date, id]
    );

    return result.rows[0];
}

async function deleteTask(id) {
    await pool.query(
        `
        DELETE FROM tasks
        WHERE id=$1
        `,
        [id]
    );
}

module.exports = {
    checkProjectOwnership,
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};