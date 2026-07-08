const taskService = require("./service");

async function createTask(req, res) {

    try {

        const { project_id, title, description, status } = req.body;

        const userId = req.session.user.id;

        const project = await taskService.checkProjectOwnership(project_id, userId);

        if (!project) {

            return res.status(403).json({
                message: "Access denied."
            });

        }

        const task = await taskService.createTask(
            project_id,
            title,
            description,
            status
        );

        res.status(201).json(task);

    }

    catch (error) {

        res.status(500).json(error.message);

    }

}

async function getTasks(req, res) {

    try {
        const userId = req.session.user.id;
        const tasks = await taskService.getTasks(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function getTaskById(req, res) {

    try {
        const userId = req.session.user.id;
        const taskId = req.params.id;
        const task = await taskService.getTaskById(taskId, userId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function updateTask(req, res) {

    try {
        const taskId = req.params.id;
        const { title, description, status, due_date } = req.body;

        const userId = req.session.user.id;
        const task = await taskService.getTaskById(taskId, userId);

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        const updatedTask = await taskService.updateTask(
            taskId,
            title,
            description,
            status,
            due_date
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function deleteTask(req, res) {

    try {
        const taskId = req.params.id;
        const userId = req.session.user.id;
        const task = await taskService.getTaskById(taskId, userId);
        await taskService.deleteTask(taskId);
        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
