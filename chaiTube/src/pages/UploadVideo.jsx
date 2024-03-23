import React, { useContext, useState, useEffect } from "react";
import styles from "./UploadVideo.module.css";
import { userContext } from "../Context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadVideo() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const userid = user?.userid;

  useEffect(() => {
    if (user === null) {
      navigate("/signIn");
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const videoData = { title, description, imgUrl, videoUrl, userid };
      const response = await axios.post(`/api/video/uploadVideo`, videoData);
      console.log(response.data);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error("Failed to update video information:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Upload Video</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          className={styles.input}
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <input
          className={styles.input}
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className={styles.label} htmlFor="imgUrl">
          Image URL
        </label>
        <input
          className={styles.input}
          type="text"
          id="imgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <label className={styles.label} htmlFor="videoUrl">
          Video URL
        </label>
        <input
          className={styles.input}
          type="text"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        {loading ? (
          <button type="button" className={styles.loading} disabled>
            Saving...{" "}
            <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..." />
          </button>
        ) : (
          <button className={styles.button} type="submit">
            Save
          </button>
        )}
      </form>
    </div>
  );
}
