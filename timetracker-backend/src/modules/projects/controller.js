const projectService = require("./service");

async function createProject(req, res) {

    try {

        const { name, description, status } = req.body;

        const userId = req.session.user.id;

        const project = await projectService.createProjects(
            userId,
            name,
            description,
            status
        );

        res.status(201).json(project);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

}

async function getProjects(req, res) {
    try {
        const userId = req.session.user.id;
        const projects = await projectService.getProjectsByUserId(userId);
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

async function getProjectById(req, res) {
    try {
        const projectId = req.params.id;
        const project = await projectService.getProjectById(projectId);
        res.json(project);
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
        const { name, description, status } = req.body;
        const updatedProject = await projectService.updateProject(
            projectId,
            name,
            description,
            status
        );
        res.json(updatedProject);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }   
}

async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const deletedProject = await projectService.deleteProject(projectId);
        res.json(deletedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};