const express = require("express");
const authRoutes = require("./routes/authRoute");
const testRoutes = require("./routes/testRoutes");
const contentRoutes = require("./routes/contentRoutes");
const errorMiddleware  = require("./middleware/errorMiddleware");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

//auth route for signuo
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/content", contentRoutes);

app.use(errorMiddleware);

module.exports = app;
