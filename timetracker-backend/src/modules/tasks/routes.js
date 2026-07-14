const router = require("express").Router();

const controller = require("./controller");
const authMiddleware = require("../../middlewares/authMiddleware");
const supervisorMiddleware = require("../../middlewares/supervisorMiddleware");


// for supervisor to create tasks for their team members
router.post(
    "/create",
    authMiddleware,
    supervisorMiddleware,
    controller.createTask
);

router.put("/:id", supervisorMiddleware, controller.updateTask);

//
router.get("/", authMiddleware, controller.getTasks);

router.get("/:id", authMiddleware, controller.getTaskById);

router.delete("/:id",supervisorMiddleware, controller.deleteTask);

// only memebers of the team can update the status of their tasks
router.patch(
    "/:id/status",
    authMiddleware,
    controller.updateTaskStatus
);
module.exports = router;