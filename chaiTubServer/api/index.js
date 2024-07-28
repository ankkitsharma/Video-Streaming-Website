import express from "express";
import env from "dotenv";
import authRoutes from "../routes/auth.js";
import pool from "../dbConfig.js";
import session from "express-session";
import passport from "passport";
import "../passport.js";
import videoRoutes from "../routes/video.js";
import commentRoutes from "../routes/comments.js";
import cors from "cors";

const app = express();
app.use(cors());
env.config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: "sessionChai",
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
  } else {
    console.log("Connected to PostgreSQL database at:", res.rows[0].now);
  }
});

// Routes
app.use("/auth", authRoutes);
app.use("/video", videoRoutes);
app.use("/comments", commentRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
