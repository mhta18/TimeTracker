const router = require("express").Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const supervisorMiddleware = require("../../middlewares/supervisorMiddleware");

const controller = require("./controller");
router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    controller.getTeamById
);

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    controller.getTeams
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    controller.createTeam
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    controller.updateTeam
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    controller.deleteTeam
);

// for supervisors to add/remove members from their teams
router.post(
    "/:id/members",
    authMiddleware,
    supervisorMiddleware,
    controller.addMember
);

router.delete(
    "/:id/members/:userId",
    authMiddleware,
    supervisorMiddleware,
    controller.removeMember
);

module.exports = router;