const router = require("express").Router();

const controller = require("./controller");
const authMiddleware = require("../../middlewares/middleware");

router.get("/", authMiddleware, controller.getTasks);

router.get("/:id", authMiddleware, controller.getTaskById);

router.post("/", authMiddleware, controller.createTask);

router.put("/:id", authMiddleware, controller.updateTask);

router.delete("/:id", authMiddleware, controller.deleteTask);

module.exports = router;