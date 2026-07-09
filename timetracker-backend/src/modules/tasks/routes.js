const router = require("express").Router();

const controller = require("./controller");
const authMiddleware = require("../../middlewares/authMiddleware");
const supervisorMiddleware = require("../../middlewares/supervisorMiddleware");

router.get("/", authMiddleware, controller.getTasks);

router.get("/:id", authMiddleware, controller.getTaskById);

// for supervisor to create tasks for their team members
router.post(
    "/",
    authMiddleware,
    supervisorMiddleware,
    controller.createTask
);

router.put("/:id", authMiddleware, supervisorMiddleware, controller.updateTask);

router.delete("/:id", authMiddleware, supervisorMiddleware, controller.deleteTask);

// only memebers of the team can update the status of their tasks
router.patch(
    "/:id/status",
    authMiddleware,
    controller.updateTaskStatus
);
module.exports = router;