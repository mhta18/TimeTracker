const router = require("express").Router();

const controller = require("./controller");
const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const supervisorMiddleware = require("../../middlewares/supervisorMiddleware")

router.get("/", authMiddleware, controller.getProjects);

router.get("/:id", authMiddleware, controller.getProjectById);

router.post("/create", authMiddleware, adminMiddleware, controller.createProject);

router.put("/:id", authMiddleware, adminMiddleware, controller.updateProject);

router.get("/:id/members", supervisorMiddleware, controller.getTaskTeamMembers);

router.delete("/:id", authMiddleware, adminMiddleware, controller.deleteProject);

router.get("/:id/tasks",authMiddleware,controller.getProjectTasks)
module.exports = router;