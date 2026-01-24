const express = require("express");
const authRoutes = require("./routes/authRoute");
const testRoutes = require("./routes/testRoutes");
const contentRoutes = require("./routes/contentRoutes");



const app = express();

app.use(express.json());


//auth route for signuo
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/content", contentRoutes);


module.exports = app;
