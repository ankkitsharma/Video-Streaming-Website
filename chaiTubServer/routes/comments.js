import express from "express";
import commentController from "../controllers/comments.js";

const router = express.Router();

router.get("/getComments/:videoId", commentController.getComments);

router.post("/addComment/:videoId", commentController.addComment);

export default router;
