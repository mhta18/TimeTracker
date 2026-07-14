const router = require("express").Router();
const authMiddleware = require("../../middlewares/authMiddleware");

const controller = require("./controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/me", authMiddleware, controller.getCurrentUser);

router.get(
    "/supervisors",
    authMiddleware,
    controller.getSupervisors
);

router.get(
    "/members",
    authMiddleware,
    controller.getMembers
);
module.exports = router;