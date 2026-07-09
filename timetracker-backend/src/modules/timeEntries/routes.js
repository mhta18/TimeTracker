const router = require("express").Router();

const controller = require("./controller");

const authMiddleware = require("../../middlewares/authMiddleware");

router.post(
    "/start/:taskId",
    authMiddleware,
    controller.startTimer
);

router.patch(
    "/pause/:taskId",
    authMiddleware,
    controller.pauseTimer
);

router.patch(
    "/resume/:taskId",
    authMiddleware,
    controller.resumeTimer
);

router.patch(
    "/stop/:taskId",
    authMiddleware,
    controller.stopTimer
);

router.get(
    "/",
    authMiddleware,
    controller.getTimeEntries
);

router.get(
    "/:id",
    authMiddleware,
    controller.getTimeEntryById
);

module.exports = router;