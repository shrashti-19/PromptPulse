const express = require("express");
const authRoutes = require("./routes/authRoute");
const testRoutes = require("./routes/testRoutes");
const app = express();

app.use(express.json());


//auth route for signuo
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

module.exports = app;
