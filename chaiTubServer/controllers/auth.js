import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import pool from "../dbConfig.js";

const app = express();
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authController = {
  getUser: (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "unauthenticated",
        user: null,
      });
    }
  },
  signUp: async (req, res, next) => {
    try {
      const { firstName, lastName, username, email, age, password } = req.body;

      const emailCheckQuery = {
        text: "SELECT * FROM Users WHERE email = $1",
        values: [email],
      };
      const emailCheckResult = await pool.query(emailCheckQuery);
      if (emailCheckResult.rows.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const insertUserQuery = {
            text: "INSERT INTO Users (firstName, lastName, username, email, age, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            values: [firstName, lastName, username, email, age, hash],
          };
          const newUser = await pool.query(insertUserQuery);
          res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0],
          });
        }
      });
    } catch (error) {
      console.error("Error signing up:", error);
      next(error);
    }
  },

  signIn: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "Sign in successful", user });
      });
    })(req, res, next);
  },

  signOut: (req, res, next) => {
    console.log("Before logout: ", req.session);
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      console.log("After logout: ", req.session);
      res.status(200).json({ message: "Sign out successful" });
    });
  },

  updateUser: async (req, res, next) => {
    try {
      const { age, img } = req.body;
      console.log(`Request body: Age: ${age}, Img: ${img}`);
      const { userid } = req.user;
      console.log("req user: ", req.user);
      console.log("userId: ", userid);
      const updateQuery = {
        text: "UPDATE Users SET age = $1, img = $2 WHERE userid = $3 RETURNING *",
        values: [age, img, userid],
      };
      const updatedUser = await pool.query(updateQuery);
      console.log("updatedUser: ", updatedUser);
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser.rows[0],
      });
    } catch (error) {
      console.error("Error updating user:", error);
      next(error);
    }
  },
};

export default authController;
