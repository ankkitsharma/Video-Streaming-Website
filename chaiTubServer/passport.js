import passport from "passport";
import { Strategy } from "passport-local";
import pool from "./dbConfig.js";
import bcrypt from "bcrypt";

passport.use(
  "local",
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async function verify(email, password, cb) {
      // console.log("here");
      try {
        const query = {
          text: "SELECT * FROM Users WHERE email = $1",
          values: [email],
        };
        const result = await pool.query(query);

        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                return cb(null, user);
              } else {
                return cb(null, false, { message: "Incorrect password" });
              }
            }
          });
        } else {
          return cb(null, false, { message: "User not found" });
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serialize user:", user);
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  console.log("Deserialize user:", user);
  cb(null, user);
});
