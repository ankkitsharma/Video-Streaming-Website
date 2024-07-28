import React, { useEffect, useState } from "react";
import styles from "./Index.module.css";
import Video from "../components/Video";
import axios from "axios";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const HOST_PORT = import.meta.env.VITE_HOST_PORT;

export default function Index() {
  const [videos, setVideos] = useState([]);
  async function getVideos() {
    try {
      const response = await axios.get(HOST_PORT + "/video/getVideos");
      console.log("HOST_PORT ", HOST_PORT);
      setVideos(response.data.videos);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get videos:", error.message);
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className={styles.Home}>
      {videos?.map((video) => (
        <Link to={`/videoPage/${video.videoid}`} key={nanoid()}>
          <Video
            className={styles.video}
            thumbnail={video.imgurl}
            title={video.title}
            channel={video.username}
            channelImg={video.img}
            views={video.views}
            uploadDate={video.uploaddate}
          />
        </Link>
      ))}
    </div>
  );
}
