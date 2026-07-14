const pool = require("../../config/db");

const VALID_STATUS = [
    "todo",
    "in_progress",
    "completed"
];

async function createTask(
    projectId,
    userId,
    assignedTo,
    title,
    description,
    status = "todo"
) {

    if (!VALID_STATUS.includes(status)) {
        throw {
            status: 400,
            message: "Invalid task status."
        };
    }

    const project = await pool.query(
        `
        SELECT *
        FROM projects
        WHERE id=$1
        AND team_id IN (
            SELECT team_id
            FROM teams
            WHERE supervisor_id=$2
        )
        `,
        [projectId, userId]
    );

    if (project.rows.length === 0) {
        throw {
            status: 403,
            message: "You do not own this project."
        };
    }

    const member = await pool.query(
        `
        SELECT *
        FROM team_members tm

        JOIN teams t
        ON tm.team_id=t.id

        WHERE
            tm.user_id=$1
        AND t.supervisor_id=$2
        `,
        [assignedTo, userId]
    );

    if (member.rows.length === 0) {
        throw {
            status: 403,
            message: "Assigned user is not in your team."
        };
    }

    const result = await pool.query(
        `
        INSERT INTO tasks
        (
            project_id,
            created_by,
            assigned_to,
            title,
            description,
            status
        )

        VALUES($1,$2,$3,$4,$5,$6)

        RETURNING *;
        `,
        [
            projectId,
            userId,
            assignedTo,
            title,
            description,
            status
        ]
    );

    return result.rows[0];

}

async function getTasks(userId, role) {

    let query;
    let values;

    if (role === "admin") {

        query = `
            SELECT
                t.*,
                p.name AS project_name
            FROM tasks t
            JOIN projects p
                ON t.project_id = p.id
        `;

        values = [];

    } else if (role === "supervisor") {

        query = `
            SELECT
                t.*,
                p.name AS project_name
            FROM tasks t
            JOIN projects p
                ON t.project_id = p.id
            WHERE t.created_by = $1
        `;

        values = [userId];

    } else {

        query = `
            SELECT
                t.*,
                p.name AS project_name
            FROM tasks t
            JOIN projects p
                ON t.project_id = p.id
            WHERE t.assigned_to = $1
        `;

        values = [userId];

    }

    const result = await pool.query(query, values);

    return result.rows;
}

async function getTaskById(id, userId, role) {

    let query;
    let values;

    if (role === "admin") {

        query = `
            SELECT
                tasks.*,
                p.name AS project_name
            FROM tasks
            JOIN projects p
                ON tasks.project_id = p.id
            WHERE tasks.id = $1;
        `;

        values = [id];

    } else {

        query = `
            SELECT
                tasks.*,
                p.name AS project_name
            FROM tasks
            JOIN projects p
                ON tasks.project_id = p.id
            WHERE tasks.id = $1
              AND (
                    tasks.created_by = $2
                    OR tasks.assigned_to = $2
                  );
        `;

        values = [id, userId];

    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        throw {
            status: 404,
            message: "Task not found."
        };
    }

    return result.rows[0];

}


async function updateTask(
    id,
    userId,
    role,
    title,
    description,
    assignedTo,
    status
) {

    if (!VALID_STATUS.includes(status)) {
        throw {
            status: 400,
            message: "Invalid task status."
        };
    }

    if (role !== "admin") {

        const owner = await pool.query(
            `
            SELECT *
            FROM tasks

            WHERE id=$1

            AND created_by=$2
            `,
            [
                id,
                userId
            ]
        );

        if (owner.rows.length === 0) {
            throw {
                status: 403,
                message: "Access denied."
            };
        }

        const member = await pool.query(
            `
            SELECT *
            FROM team_members tm

            JOIN teams t
            ON tm.team_id=t.id

            WHERE
                tm.user_id=$1
            AND t.supervisor_id=$2
            `,
            [
                assignedTo,
                userId
            ]
        );

        if (member.rows.length === 0) {
            throw {
                status: 403,
                message: "Assigned user is not in your team."
            };
        }
    }

    const result = await pool.query(
        `
        UPDATE tasks

        SET

            title=$1,
            description=$2,
            assigned_to=$3,
            status=$4

        WHERE id=$5

        RETURNING *;
        `,
        [
            title,
            description,
            assignedTo,
            status,
            id
        ]
    );

    return result.rows[0];

}

async function updateTaskStatus(
    id,
    memberId,
    status
) {

    if (!VALID_STATUS.includes(status)) {
        throw {
            status: 400,
            message: "Invalid task status."
        };
    }

    const result = await pool.query(
        `
        UPDATE tasks

        SET status=$1

        WHERE

            id=$2

        AND assigned_to=$3

        RETURNING *;
        `,
        [
            status,
            id,
            memberId
        ]
    );

    if (result.rows.length === 0) {
        throw {
            status: 403,
            message: "You are not assigned to this task."
        };
    }

    return result.rows[0];

}

async function deleteTask(
    id,
    userId,
    role
) {

    let result;

    if (role === "admin") {

        result = await pool.query(
            `
            DELETE FROM tasks
            WHERE id=$1
            RETURNING *;
            `,
            [id]
        );

    }

    else {

        result = await pool.query(
            `
            DELETE FROM tasks

            WHERE
                id=$1
            AND created_by=$2

            RETURNING *;
            `,
            [
                id,
                userId
            ]
        );

    }

    if (result.rows.length === 0) {
        throw {
            status: 403,
            message: "Access denied."
        };
    }

    return result.rows[0];

}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
};