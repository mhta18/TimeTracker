const timeEntryService = require("./service");

async function createTimeEntry(req, res) {

    try {

        const userId = req.session.user.id;

        const {
            task_id,
            start_time,
            end_time
        } = req.body;


        const task =
            await timeEntryService.checkTaskOwnership(
                task_id,
                userId
            );


        if (!task) {

            return res.status(403).json({
                message: "You cannot add time to this task"
            });

        }


        const duration =
            Math.floor(
                (new Date(end_time) - new Date(start_time))
                / 60000
            );


        const entry =
            await timeEntryService.createTimeEntry(
                task_id,
                start_time,
                end_time,
                duration
            );


        res.status(201).json(entry);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}

async function getTimeEntries(req, res) {

    try {
        const userId = req.session.user.id;
        const entries = await timeEntryService.getTimeEntries(userId);
        res.json(entries);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
async function getTimeEntryById(req, res) {

    try {
        const userId = req.session.user.id;
        const { id } = req.params;
        const entry = await timeEntryService.getTimeEntryById(id, userId);
        res.json(entry);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function updateTimeEntry(req, res) {

    try {
        const userId = req.session.user.id;
        const { id } = req.params;
        const { start_time, end_time, duration } = req.body;
        const entry = await timeEntryService.updateTimeEntry(id, userId, start_time, end_time, duration);
        res.json(entry);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteTimeEntry(req, res) {

    try {
        const userId = req.session.user.id;
        const { id } = req.params;
        const entry = await timeEntryService.deleteTimeEntry(id, userId);
        res.json(entry);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createTimeEntry,
    getTimeEntries,
    getTimeEntryById,
    updateTimeEntry,
    deleteTimeEntry
};