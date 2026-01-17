const express = require("express");
const authRoutes = require("./routes/authRoute");
const app = express();

app.use(express.json());


//auth route for signuo
app.use("/api/auth", authRoutes);
module.exports = app;
