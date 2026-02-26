const express = require("express");
const authRoutes = require("./routes/authRoute");
const testRoutes = require("./routes/testRoutes");
const contentRoutes = require("./routes/contentRoutes");
const errorMiddleware  = require("./middleware/errorMiddleware");
const morgan = require("morgan");
const aiRoutes = require("./routes/airRoutes");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

//auth route for signuo
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

module.exports = app;
