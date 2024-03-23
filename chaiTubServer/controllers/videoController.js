import pool from "../dbConfig.js";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const videoController = {
  uploadVideo: async (req, res, next) => {
    try {
      const { title, description, imgUrl, videoUrl, userid } = req.body;
      const insertQuery = {
        text: "INSERT INTO Videos (title, description, imgurl, videourl, uploadedby) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        values: [title, description, imgUrl, videoUrl, userid],
      };
      const insertedVideo = await pool.query(insertQuery);
      return res.status(200).json({
        message: "Video uploaded successfully",
        video: insertedVideo.rows[0],
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      next(error);
    }
  },

  getVideos: async (req, res, next) => {
    try {
      const getQuery = {
        text: `SELECT 
        v.videoId, 
        v.imgUrl, 
        v.title, 
        u.username, 
        v.views, 
        v.uploadDate, 
        u.img 
    FROM Videos v 
    JOIN Users u ON v.uploadedBy = u.userId;`,
      };
      const videos = await pool.query(getQuery);
      return res.status(200).json({
        message: "Videos fetched successfully",
        videos: videos.rows,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
      next(error);
    }
  },

  getVideo: async (req, res, next) => {
    try {
      const { videoId } = req.params;
      const getQuery = {
        text: `SELECT v.videoId, v.videoUrl, v.title, v.description, v.uploadDate, v.views, u.username, u.img, v.uploadedBy 
        FROM Videos v
        JOIN Users u ON v.uploadedBy = u.userId
        WHERE v.videoId = $1;`,
        values: [videoId],
      };
      const video = await pool.query(getQuery);
      if (video.rows.length === 0) {
        return res.status(404).json({
          message: "Video not found",
        });
      }
      return res.status(200).json({
        message: "Video fetched successfully",
        video: video.rows[0],
      });
    } catch (error) {
      console.error("Error fetching video:", error);
      next(error);
    }
  },

  increaseViews: async (req, res, next) => {
    try {
      const { videoId } = req.params;
      const updateQuery = {
        text: "UPDATE Videos SET views = views + 1 WHERE videoId = $1",
        values: [videoId],
      };
      await pool.query(updateQuery);
      return res.status(200).json({
        message: "Views increased successfully",
      });
    } catch (error) {
      console.error("Error increasing views:", error);
      next(error);
    }
  },

  likeVideo: async (req, res, next) => {
    try {
      const { videoId } = req.params;
      const { actionType } = req.body; // 1 for like, 0 for none, -1 for dislike
      const { userId } = req.body;

      const checkQuery = {
        text: `SELECT * FROM VideoLikes WHERE videoId = $1 AND userId = $2;`,
        values: [videoId, userId],
      };

      const checkResult = await pool.query(checkQuery);

      if (checkResult.rows.length > 0) {
        const updateQuery = {
          text: `UPDATE VideoLikes SET action_type = $1 WHERE videoId = $2 AND userId = $3;`,
          values: [actionType, videoId, userId],
        };
        await pool.query(updateQuery);
        return res.status(200).json({
          message: "Like updated successfully",
        });
      } else {
        const insertQuery = {
          text: `INSERT INTO VideoLikes (videoId, action_type, userId) VALUES ($1, $2, $3);`,
          values: [videoId, actionType, userId],
        };
        await pool.query(insertQuery);
        return res.status(201).json({
          message: "Like created successfully",
        });
      }
    } catch (error) {
      console.error("Error liking video:", error);
      next(error);
    }
  },

  getLikes: async (req, res, next) => {
    try {
      const { videoId } = req.params;
      const getQuery = {
        text: `SELECT * FROM VideoLikes WHERE videoId = $1;`,
        values: [videoId],
      };
      const likes = await pool.query(getQuery);
      return res.status(200).json({
        message: "Likes fetched successfully",
        likes: likes.rows,
      });
    } catch (error) {
      console.error("Error fetching likes:", error);
      next(error);
    }
  },

  subscription: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { subscriberId, actionType } = req.body;
      const action_type = parseInt(actionType);
      if (action_type !== 1 && action_type !== 0) {
        return res.status(400).json({
          message:
            "Invalid action type, only 1 or 0 are allowed for subscription",
        });
      }
      const checkQuery = {
        text: `SELECT * FROM subscribers WHERE userid = $1 AND subscriberid = $2;`,
        values: [userId, subscriberId],
      };
      const checkResult = await pool.query(checkQuery);

      if (checkResult.rows.length === 0 && action_type === 1) {
        const insertQuery = {
          text: `INSERT INTO Subscribers (userId, subscriberId) VALUES ($1, $2) Returning *;`,
          values: [userId, subscriberId],
        };
        const response1 = await pool.query(insertQuery);
        return res.status(201).json({
          message: "Subscribed successfully",
          response: response1.rows,
        });
      } else if (checkResult.rows.length > 0 && action_type === 0) {
        const deleteQuery = {
          text: `DELETE FROM Subscribers WHERE userId = $1 AND subscriberId = $2 Returning *;`,
          values: [userId, subscriberId],
        };
        const response2 = await pool.query(deleteQuery);
        return res.status(200).json({
          message: "Unsubscribed successfully",
          response: response2.rows,
        });
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      next(error);
    }
  },

  getSubscriptions: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const getQuery = {
        text: `SELECT * FROM Subscribers WHERE userId = $1;`,
        values: [userId],
      };
      const subscriptions = await pool.query(getQuery);
      return res.status(200).json({
        message: "Subscriptions fetched successfully",
        subscriptions: subscriptions.rows,
      });
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      next(error);
    }
  },

  search: async (req, res, next) => {
    try {
      const query = req.query.q;
      const getQuery = {
        text: `SELECT v.videoId, v.imgUrl, v.title, u.username, v.views, v.uploadDate, u.img FROM Videos v JOIN Users u ON v.uploadedBy = u.userId WHERE v.title ILIKE $1;`,
        values: [`%${query}%`],
      };
      const videos = await pool.query(getQuery);
      return res.status(200).json({
        message: "Videos fetched successfully",
        videos: videos.rows,
      });
    } catch (error) {
      console.error("Error searching videos:", error);
      next(error);
    }
  },
};

export default videoController;
