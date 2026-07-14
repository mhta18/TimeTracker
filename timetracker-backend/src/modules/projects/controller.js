const projectService = require("./service");

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

async function getProjectTasks(req, res) {
    try {
        const role = req.session.user.role;
        const userId = req.session.user.id;
        const projectId = req.params.id;
        const tasks = await projectService.getProjectTasks(role, userId, projectId);
        res.json(tasks);
    } catch (error) {
        return handleError(res, error);
    }

}

async function createProject(req, res) {

    try {

        const { team_id, name, description, status } = req.body;

        const project = await projectService.createProject(
            team_id,
            name,
            description,
            status
        );

        res.status(201).json(project);

    } catch (error) {
        return handleError(res, error);
    }

}

async function getProjects(req, res) {
    try {
        const role = req.session.user.role;
        const userId = req.session.user.id;
        const projects = await projectService.getProjects(role, userId);
        res.json(projects);
    } catch (error) {
        return handleError(res, error);
    }
}

async function getProjectById(req, res) {
    try {
        const role = req.session.user.role;
        const userId = req.session.user.id;
        const projectId = req.params.id;

        const project = await projectService.getProjectById(projectId);

        res.json(project);

    } catch (error) {
        return handleError(res, error);

    }
}

async function getTaskTeamMembers(req, res) {

    try {

        const projectId = req.params.id;
        const members = await projectService.getTaskTeamMembers(projectId);

        res.json(members);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

}

async function updateProject(req, res) {
    try {
        const projectId = req.params.id;
        const { team_id, name, description, status } = req.body;
        const updatedProject = await projectService.updateProject(
            projectId,
            req.session.user.role,
            team_id,
            name,
            description,
            status
        );
        res.json(updatedProject);
    }
    catch (error) {
        return handleError(res, error);
    }
}

async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const role = req.session.user.role;
        const deletedProject = await projectService.deleteProject(projectId, role);
        res.json(deletedProject);
    } catch (error) {
        return handleError(res, error);
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectTasks,
    getTaskTeamMembers
};