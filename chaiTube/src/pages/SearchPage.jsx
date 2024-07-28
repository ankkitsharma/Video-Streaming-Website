import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Video from "../components/Video";
import styles from "./Index.module.css";
import { nanoid } from "nanoid";
const HOST_PORT = import.meta.env.VITE_HOST_PORT;

export const SearchPage = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${HOST_PORT}/video/search${query}`);
        setVideos(response.data.videos);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to get videos:", error.message);
      }
    };
    fetchVideos();
  }, [query]);
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
};
