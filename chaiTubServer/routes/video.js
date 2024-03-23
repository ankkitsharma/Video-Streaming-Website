import express from "express";
import videoController from "../controllers/videoController.js";

const router = express.Router();

router.post("/uploadVideo", videoController.uploadVideo);

router.get("/getVideos", videoController.getVideos);

router.get("/getVideo/:videoId", videoController.getVideo);

router.patch("/increaseViews/:videoId", videoController.increaseViews);

router.post("/likeVideo/:videoId", videoController.likeVideo);

router.get("/getLikes/:videoId", videoController.getLikes);

router.post("/subscription/:userId", videoController.subscription);

router.get("/getSubscriptions/:userId", videoController.getSubscriptions);

router.get("/search?:q", videoController.search);

export default router;
