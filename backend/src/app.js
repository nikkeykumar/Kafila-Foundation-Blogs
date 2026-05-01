const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
const cors = require("cors");

// cors configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
    credentials: true,
    }

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

module.exports = app;
