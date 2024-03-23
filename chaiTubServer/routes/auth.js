import express from "express";
import authController from "../controllers/auth.js";

const router = express.Router();

router.get("/getUser", authController.getUser);

router.patch("/updateUser", authController.updateUser);

router.post("/signIn", authController.signIn);

router.post("/signUp", authController.signUp);

router.get("/signout", authController.signOut);

export default router;
