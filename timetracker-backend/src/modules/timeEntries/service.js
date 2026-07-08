const pool = require("../../config/db");

// Check if task belongs to logged-in user
async function checkTaskOwnership(taskId, userId) {

    const result = await pool.query(
        `
        SELECT tasks.id
        FROM tasks
        JOIN projects
        ON tasks.project_id = projects.id
        WHERE tasks.id = $1
        AND projects.user_id = $2
        `,
        [taskId, userId]
    );

    return result.rows[0];
}



// Create a time entry
async function createTimeEntry(
    taskId,
    startTime,
    endTime,
    duration
) {

    const result = await pool.query(
        `
        INSERT INTO time_entries
        (task_id, start_time, end_time, duration)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,
        [
            taskId,
            startTime,
            endTime,
            duration
        ]
    );

    return result.rows[0];
}



// Get all time entries of a user
async function getTimeEntries(userId) {

    const result = await pool.query(
        `
        SELECT 
            time_entries.*
        FROM time_entries

        JOIN tasks
        ON time_entries.task_id = tasks.id

        JOIN projects
        ON tasks.project_id = projects.id

        WHERE projects.user_id = $1

        ORDER BY time_entries.created_at DESC
        `,
        [userId]
    );


    return result.rows;
}



// Get one time entry
async function getTimeEntryById(id, userId) {

    const result = await pool.query(
        `
        SELECT
            time_entries.*
        FROM time_entries

        JOIN tasks
        ON time_entries.task_id = tasks.id

        JOIN projects
        ON tasks.project_id = projects.id

        WHERE time_entries.id = $1
        AND projects.user_id = $2
        `,
        [
            id,
            userId
        ]
    );


    return result.rows[0];
}



// Update time entry
async function updateTimeEntry(
    id,
    userId,
    startTime,
    endTime,
    duration
) {

    const result = await pool.query(
        `
        UPDATE time_entries

        SET
        start_time = $1,
        end_time = $2,
        duration = $3

        WHERE id = $4

        AND task_id IN (

            SELECT tasks.id
            FROM tasks

            JOIN projects
            ON tasks.project_id = projects.id

            WHERE projects.user_id = $5
        )

        RETURNING *
        `,
        [
            startTime,
            endTime,
            duration,
            id,
            userId
        ]
    );


    return result.rows[0];
}



// Delete time entry
async function deleteTimeEntry(id, userId) {

    const result = await pool.query(
        `
        DELETE FROM time_entries

        WHERE id = $1

        AND task_id IN (

            SELECT tasks.id
            FROM tasks

            JOIN projects
            ON tasks.project_id = projects.id

            WHERE projects.user_id = $2
        )

        RETURNING *
        `,
        [
            id,
            userId
        ]
    );


    return result.rows[0];
}



module.exports = {
    createTimeEntry,
    getTimeEntries,
    getTimeEntryById,
    updateTimeEntry,
    deleteTimeEntry,
    checkTaskOwnership
};