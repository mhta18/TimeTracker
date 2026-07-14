const taskService = require("./service");

function handleError(res, error) {
    if (error.status) {
        return res.status(error.status).json({
            message: error.message
        });
    }

    console.error(error);

    return res.status(500).json({
        message: "Internal server error."
    });
}

async function createTask(req, res) {
    try {
        const {
            project_id,
            assigned_to,
            title,
            description,
            status
        } = req.body;
        const task = await taskService.createTask(
            project_id,
            req.session.user.id,
            assigned_to,
            title,
            description,
            status
        );

        return res.status(201).json(task);

    } catch (error) {
        return handleError(res, error);
    }
}

async function getTasks(req, res) {
    try {

        const tasks = await taskService.getTasks(
            req.session.user.id,
            req.session.user.role
        );

        return res.json(tasks);

    } catch (error) {
        return handleError(res, error);
    }
}

async function getTaskById(req, res) {
    try {

        const task = await taskService.getTaskById(
            req.params.id,
            req.session.user.id,
            req.session.user.role
        );

        return res.json(task);

    } catch (error) {
        return handleError(res, error);
    }
}

async function updateTask(req, res) {
    try {

        const {
            title,
            description,
            assigned_to,
            status
        } = req.body;

        const task = await taskService.updateTask(
            req.params.id,
            req.session.user.id,
            req.session.user.role,
            title,
            description,
            assigned_to,
            status
        );

        return res.json(task);

    } catch (error) {
        return handleError(res, error);
    }
}

async function updateTaskStatus(req, res) {
    try {

        const { status } = req.body;

        const task = await taskService.updateTaskStatus(
            req.params.id,
            req.session.user.id,
            status
        );

        return res.json(task);

    } catch (error) {
        return handleError(res, error);
    }
}

async function deleteTask(req, res) {
    try {

        await taskService.deleteTask(
            req.params.id,
            req.session.user.id,
            req.session.user.role
        );

        return res.json({
            message: "Task deleted successfully."
        });

    } catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
};