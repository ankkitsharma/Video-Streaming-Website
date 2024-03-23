import pool from "../dbConfig.js";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentController = {
  getComments: async (req, res, next) => {
    try {
      const { videoId } = req.params;
      const getQuery = {
        text: `SELECT 
                c.commentId, 
                u.username,
                u.img, 
                c.commentText, 
                c.commentDate 
            FROM Comments c 
            JOIN Users u ON c.userId = u.userId 
            WHERE c.videoId = $1;`,
        values: [videoId],
      };
      const comments = await pool.query(getQuery);
      return res.status(200).json({
        message: "Comments fetched successfully",
        comments: comments.rows,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      next(error);
    }
  },
  addComment: async (req, res, next) => {
    try {
      const { videoId } = req.params;
      const { userId, commentText } = req.body;
      const addQuery = {
        text: "INSERT INTO Comments (videoId, userId, commentText) VALUES ($1, $2, $3) RETURNING *",
        values: [videoId, userId, commentText],
      };
      const comment = await pool.query(addQuery);
      return res.status(200).json({
        message: "Comment added successfully",
        comment: comment.rows[0],
      });
    } catch (error) {
      console.log("hey");
      console.error("Error adding comment:", error);
      next(error);
    }
  },
};

export default commentController;
