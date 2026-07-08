const router = require("express").Router();

const controller = require("./controller");
const authMiddleware = require("../../middlewares/middleware");

router.get("/", authMiddleware, controller.getTimeEntries);

router.get("/:id", authMiddleware, controller.getTimeEntryById);

router.post("/", authMiddleware, controller.createTimeEntry);

router.put("/:id", authMiddleware, controller.updateTimeEntry);

router.delete("/:id", authMiddleware, controller.deleteTimeEntry);

module.exports = router;