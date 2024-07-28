import React, { useContext, useState, useEffect } from "react";
import styles from "./channelSettings.module.css";
import { userContext } from "../Context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const HOST_PORT = import.meta.env.VITE_HOST_PORT;

export default function ChannelSettings() {
  const { user, setUser } = useContext(userContext);
  const [age, setAge] = useState();
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/signIn");
    } else if (user) {
      setAge(user.age);
      setImg(user.img);
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { age, img };
      const response = await axios.patch(
        `${HOST_PORT}/auth/updateUser`,
        userData
      );
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Failed to update user:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Channel Settings</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="img">Profile Picture URL</label>
        <input
          type="text"
          id="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        {loading ? (
          <button type="button" className={styles.loading} disabled>
            Saving...{" "}
            <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..." />
          </button>
        ) : (
          <button type="submit">Save</button>
        )}
      </form>
    </div>
  );
}
