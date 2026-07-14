const timeEntryService = require("./service");

function handleError(res, error) {

    if (error.status) {
        return res.status(error.status).json({
            message: error.message
        });
    }

    console.error(error);

    return res.status(500).json({
        message: "Internal server error."
    });
}

async function startTimer(req, res) {
    try {
        const { taskId } = req.params;
        const userId = req.session.user.id;

        const timeEntry = await timeEntryService.startTimer(taskId, userId);

        return res.status(201).json(timeEntry);

    } catch (error) {
        return handleError(res, error);
    }
}

async function pauseTimer(req, res) {
    try {
        const { taskId } = req.params;
        const userId = req.session.user.id;

        const timeEntry = await timeEntryService.pauseTimer(taskId,userId);

        return res.json(timeEntry);

    } catch (error) {
        return handleError(res, error);
    }
}

async function resumeTimer(req, res) {
    try {
        const { taskId } = req.params;
        const userId = req.session.user.id;

        const timeEntry = await timeEntryService.resumeTimer(taskId, userId);

        return res.json(timeEntry);

    } catch (error) {
        return handleError(res, error);
    }
}

async function stopTimer(req, res) {
    try {
        const { taskId } = req.params;
        const userId = req.session.user.id;

        const timeEntry = await timeEntryService.stopTimer(taskId, userId);

        return res.json(timeEntry);

    } catch (error) {

        return handleError(res, error);
    }
}

async function getTimeEntries(req, res) {
    try {
        const userId = req.session.user.id;

        const timeEntries = await timeEntryService.getTimeEntries(userId);

        return res.json(timeEntries);

    } catch (error) {
        return handleError(res, error);
    }
}

async function getTimeEntryById(req, res) {
    try {
        const { id } = req.params;
        const userId = req.session.user.id;

        const timeEntry = await timeEntryService.getTimeEntryById(id, userId);

        if (!timeEntry) {
            return handleError(res, {
                status: 404,
                message: "Time entry not found."
            });
        }

        return res.json(timeEntry);

    } catch (error) {
        return handleError(res, error);
    }
}

async function getCurrentTimer(req, res) {
    try {

        const userId = req.session.user.id;

        const activeTimer = await timeEntryService.getActiveTimer(userId);

        if (!activeTimer) {
            return res.status(200).json(null);
        }

        return res.status(200).json(activeTimer);

    } catch (error) {
        console.error("Error fetching current active timer:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

async function deleteTimeEntry(req, res) {
    try {
        const entryId = req.params.id;
        const userId = req.session.user.id;

        if (!entryId) {
            return res.status(400).json({ message: "Time entry ID is required." });
        }

        const deletedEntry = await timeEntryService.deleteTimeEntry(entryId, userId);

        if (!deletedEntry) {
            return res.status(404).json({
                message: "Time entry not found or you do not have permission to delete it."
            });
        }
        return res.status(200).json({
            message: "Time entry deleted successfully.",
            deletedEntry
        });

    } catch (error) {
        console.error("Error in deleteTimeEntry controller:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    getTimeEntries,
    getTimeEntryById,
    getCurrentTimer,
    deleteTimeEntry
};