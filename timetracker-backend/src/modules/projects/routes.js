const router = require("express").Router();

const controller = require("./controller");
const authMiddleware = require("../../middlewares/middleware");

router.get("/", authMiddleware, controller.getProjects);

router.get("/:id", authMiddleware, controller.getProjectById);

router.post("/", authMiddleware, controller.createProject);

router.put("/:id", authMiddleware, controller.updateProject);

router.delete("/:id", authMiddleware, controller.deleteProject);

module.exports = router;