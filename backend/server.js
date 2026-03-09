require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const activityRoutes = require("./routes/activityRoutes");
const commentRoutes = require("./routes/commentRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
const errorHandler = require("./middleware/errorHandler");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use("/api/attachments", attachmentRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("TaskManager API running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
