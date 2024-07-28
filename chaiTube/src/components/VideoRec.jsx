import React, { useEffect, useState } from "react";
import styles from "./VideoRec.module.css";

export default function VideoRec({
  thumbnail,
  title,
  channel,
  views,
  uploadDate,
}) {
  const [timeDiff, setTimeDiff] = useState("");
  function calculateTimeDifference(uploadDate) {
    const uploadTime = new Date(uploadDate).getTime();
    const timeDifference = (new Date().getTime() - uploadTime) / 1000;

    if (timeDifference >= 60 * 60 * 24 * 30)
      return `${Math.floor(timeDifference / (60 * 60 * 24 * 30))} month${
        Math.floor(timeDifference / (60 * 60 * 24 * 30)) > 1 ? "s" : ""
      } ago`;
    if (timeDifference >= 60 * 60 * 24)
      return `${Math.floor(timeDifference / (60 * 60 * 24))} day${
        Math.floor(timeDifference / (60 * 60 * 24)) > 1 ? "s" : ""
      } ago`;
    if (timeDifference >= 60 * 60)
      return `${Math.floor(timeDifference / (60 * 60))} hour${
        Math.floor(timeDifference / (60 * 60)) > 1 ? "s" : ""
      } ago`;
    if (timeDifference >= 60)
      return `${Math.floor(timeDifference / 60)} minute${
        Math.floor(timeDifference / 60) > 1 ? "s" : ""
      } ago`;

    return `${Math.floor(timeDifference)} second${
      Math.floor(timeDifference) > 1 ? "s" : ""
    } ago`;
  }

  useEffect(() => {
    setTimeDiff(calculateTimeDifference(uploadDate));
    console.log("thumbnail ", thumbnail);
  }, []);
  return (
    <div className={styles.videoRec}>
      <img
        className={styles.thumbnail}
        src={"/" + thumbnail}
        width={168}
        height={94}
      ></img>
      <div className={styles.videoInfo}>
        <p className={styles.title}>{title}</p>
        <p className={styles.channel}>{channel}</p>
        <p className={styles.stats}>
          {views} views · {timeDiff}
        </p>
      </div>
    </div>
  );
}
