function supervisorMiddleware(req, res, next) {

    if (!req.session.user) {

        return res.status(401).json({
            message: "Please login first."
        });

    }

    if (req.session.user.role !== "supervisor") {

        return res.status(403).json({
            message: "Only supervisors can perform this action."
        });

    }

    next();

}

module.exports = supervisorMiddleware;