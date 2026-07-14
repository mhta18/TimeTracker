const router = require("express").Router();

const controller = require("./controller");

const authMiddleware = require("../../middlewares/authMiddleware");

router.post(
    "/task/:taskId/start",
    authMiddleware,
    controller.startTimer
);

router.patch(
    "/task/:taskId/pause",
    authMiddleware,
    controller.pauseTimer
);

router.patch(
    "/task/:taskId/resume",
    authMiddleware,
    controller.resumeTimer
);

router.patch(
    "/task/:taskId/stop",
    authMiddleware,
    controller.stopTimer
);

router.get(
    "/",
    authMiddleware,
    controller.getTimeEntries
);

router.get(
    "/:id/current",
    authMiddleware,
    controller.getTimeEntryById
);

router.delete('/:id',authMiddleware,controller.deleteTimeEntry);

router.get('/current', authMiddleware, controller.getCurrentTimer);

module.exports = router;