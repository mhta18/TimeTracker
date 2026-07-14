const teamService = require("./service");

async function createTeam(req, res) {

    try {

        const { name, description, supervisor_id, member_ids } = req.body;

        const newTeam = await teamService.createTeam(name, description, supervisor_id, member_ids);

        res.status(201).json(newTeam);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}

async function getTeamMembers(req, res) {
    try {
        const teamId = req.params.id
        const memebers = teamService.getTeamMembers(teamId);
        res.json(memebers);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

async function getTeams(req, res) {

    try {

        const teams =
            await teamService.getTeams();

        res.json(teams);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}

async function getTeamById(req, res) {

    try {

        const team =
            await teamService.getTeamById(
                req.params.id
            );

        if (!team) {

            return res.status(404).json({
                message: "Team not found."
            });

        }

        res.json(team);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}

async function getSupervisors(req, res) {

    try {

        const supervisors = await userService.getSupervisors();

        res.json(supervisors);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

}

async function updateTeam(req, res) {

    try {

        const {
            name,
            description,
            supervisor_id,
            member_ids
        } = req.body;

        const team = await teamService.updateTeam(
            req.params.id,
            name,
            description,
            supervisor_id,
            member_ids
        );

        if (!team) {

            return res.status(404).json({
                message: "Team not found."
            });

        }

        res.json(team);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}

async function deleteTeam(req, res) {

    try {

        const team =
            await teamService.deleteTeam(
                req.params.id
            );

        if (!team) {

            return res.status(404).json({
                message: "Team not found."
            });

        }

        res.json({
            message: "Team deleted."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}

async function addMember(req, res) {

    try {

        const teamId = req.params.id;
        const supervisorId = req.session.user.id;
        const { user_id } = req.body;


        // Check ownership
        const team =
            await teamService.checkSupervisorOwnsTeam(
                teamId,
                supervisorId
            );

        if (!team) {

            return res.status(403).json({
                message: "You don't manage this team."
            });

        }

        const user =
            await teamService.checkUserExists(
                user_id
            );

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }
        const exists =
            await teamService.memberExists(
                teamId,
                user_id
            );

        if (exists) {

            return res.status(400).json({
                message: "User already belongs to this team."
            });

        }


        const member =
            await teamService.addMember(
                teamId,
                user_id
            );

        res.status(201).json(member);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


async function removeMember(req, res) {

    try {

        const teamId = req.params.id;
        const supervisorId = req.session.user.id;
        const userId = req.params.userId;

        const team =
            await teamService.checkSupervisorOwnsTeam(
                teamId,
                supervisorId
            );

        if (!team) {

            return res.status(403).json({
                message: "You don't manage this team."
            });

        }


        const member =
            await teamService.removeMember(
                teamId,
                userId
            );

        if (!member) {

            return res.status(404).json({
                message: "Member not found."
            });

        }

        res.json({
            message: "Member removed."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}

module.exports = {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    addMember,
    removeMember,
    getTeamMembers,

};