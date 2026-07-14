const router = require("express").Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const supervisorMiddleware = require("../../middlewares/supervisorMiddleware");

const controller = require("./controller");
router.get(
    "/:id",
    adminMiddleware,
    controller.getTeamById
);

router.get(
    "/",
    adminMiddleware,
    controller.getTeams
);

router.post(
    "/create",
    adminMiddleware,
    controller.createTeam
);

router.put(
    "/:id",
    adminMiddleware,
    controller.updateTeam
);

router.delete(
    "/:id",
    adminMiddleware,
    controller.deleteTeam
);

// for supervisors to add/remove/get members from their teams
router.get("/:id/members", authMiddleware, controller.getTeamMembers);//?

router.post(
    "/:id/members",
    supervisorMiddleware,
    controller.addMember
);

router.delete(
    "/:id/members/:userId",
    supervisorMiddleware,
    controller.removeMember
);

module.exports = router;