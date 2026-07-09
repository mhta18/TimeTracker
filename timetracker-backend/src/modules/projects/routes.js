const router = require("express").Router();

const controller = require("./controller");
const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");

router.get("/", authMiddleware, controller.getProjects);

router.get("/:id", authMiddleware, controller.getProjectById);

router.post("/", authMiddleware, adminMiddleware, controller.createProject);

router.put("/:id", authMiddleware, adminMiddleware, controller.updateProject);

router.delete("/:id", authMiddleware, adminMiddleware, controller.deleteProject);

module.exports = router;