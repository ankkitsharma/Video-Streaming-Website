import React from "react";
import styles from "./ChannelProfile.module.css";

export default function ChannelProfile({ imgLink }) {
  return (
    <>
      <img
        src={
          imgLink ||
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
        className={styles.profileimg}
        alt="profile image"
      ></img>
    </>
  );
}
