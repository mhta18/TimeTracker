const express = require("express");
const cors = require("cors");
const session = require("express-session");
const projectRoutes = require("./modules/projects/routes");
const authRoutes = require("./modules/authentications/routes");
const taskRoutes = require("./modules/tasks/routes");
const timeEntryRoutes = require("./modules/timeEntries/routes");
const teamRoutes = require("./modules/teams/routes");


const app = express()

app.use(cors());
app.use(express.json());

app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
}));

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/timeentries", timeEntryRoutes);
app.use("/api/teams", teamRoutes);

app.get("/", (req, res) => {
    res.json({ message: "TimeTracker API running" });
});

module.exports = app;