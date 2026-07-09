const pool = require("../../config/db");

async function checkTaskOwnership(taskId, userId) {

    const result = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE id = $1
        AND assigned_to = $2;
        `,
        [taskId, userId]
    );

    return result.rows[0];
}

async function checkRunningTimer(taskId) {

    const result = await pool.query(
        `
        SELECT *
        FROM time_entries
        WHERE task_id = $1
        AND status = 'running';
        `,
        [taskId]
    );

    return result.rows[0];
}

async function checkPausedTimer(taskId) {

    const result = await pool.query(
        `
        SELECT *
        FROM time_entries
        WHERE task_id = $1
        AND status = 'paused';
        `,
        [taskId]
    );

    return result.rows[0];
}

async function startTimer(taskId, userId) {

    const task = await checkTaskOwnership(taskId, userId);

    if (!task) {
        throw { status: 403, message: "Access denied." };
    }

    const running = await checkRunningTimer(taskId);

    if (running) {
        throw { status: 400, message: "Timer is already running." };
    }

    const result = await pool.query(
        `
        INSERT INTO time_entries
        (
            task_id,
            start_time,
            last_started_at,
            status,
            total_duration
        )
        VALUES
        (
            $1,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP,
            'running',
            0
        )
        RETURNING *;
        `,
        [taskId]
    );

    return result.rows[0];
}

async function pauseTimer(taskId, userId) {

    const task = await checkTaskOwnership(taskId, userId);

    if (!task) {
        throw { status: 403, message: "Access denied." };
    }

    const timer = await checkRunningTimer(taskId);

    if (!timer) {
        throw { status: 400, message: "No running timer found." };
    }

    const result = await pool.query(
        `
        UPDATE time_entries

        SET
            total_duration =
                total_duration +
                EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - last_started_at)),
            last_started_at = NULL,
            status = 'paused'

        WHERE id = $1

        RETURNING *;
        `,
        [timer.id]
    );

    return result.rows[0];
}

async function resumeTimer(taskId, userId) {

    const task = await checkTaskOwnership(taskId, userId);

    if (!task) {
        throw { status: 403, message: "Access denied." };
    }

    const timer = await checkPausedTimer(taskId);

    if (!timer) {
        throw { status: 400, message: "Timer is not paused." };
    }

    const result = await pool.query(
        `
        UPDATE time_entries

        SET
            status='running',
            last_started_at=CURRENT_TIMESTAMP

        WHERE id=$1

        RETURNING *;
        `,
        [timer.id]
    );

    return result.rows[0];
}

async function stopTimer(taskId, userId) {

    const task = await checkTaskOwnership(taskId, userId);

    if (!task) {
        throw { status: 403, message: "Access denied." };
    }

    const timer = await checkRunningTimer(taskId);

    if (!timer) {
        throw { status: 400, message: "No running timer found." };
    }

    const result = await pool.query(
        `
        UPDATE time_entries

        SET

            total_duration =
                total_duration +
                EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - last_started_at)),

            end_time = CURRENT_TIMESTAMP,

            last_started_at = NULL,

            status = 'stopped'

        WHERE id = $1

        RETURNING *;
        `,
        [timer.id]
    );

    return result.rows[0];
}

async function getTimeEntries(userId) {

    const result = await pool.query(
        `
        SELECT te.*

        FROM time_entries te

        JOIN tasks t
        ON te.task_id = t.id

        WHERE t.assigned_to = $1

        ORDER BY te.created_at DESC;
        `,
        [userId]
    );

    return result.rows;
}

async function getTimeEntryById(id, userId) {

    const result = await pool.query(
        `
        SELECT te.*

        FROM time_entries te

        JOIN tasks t
        ON te.task_id = t.id

        WHERE te.id = $1

        AND t.assigned_to = $2;
        `,
        [
            id,
            userId
        ]
    );

    return result.rows[0];
}

module.exports = {
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    getTimeEntries,
    getTimeEntryById
};