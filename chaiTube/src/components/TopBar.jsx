import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TopBar.module.css";
import Search from "./Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import ChannelProfile from "./ChannelProfile";
import { userContext } from "../Context/userContext";

export default function TopBar() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  // console.log("in top bar", user);
  return (
    <div className={styles.topbar}>
      <Link to={"/"} className={styles.Link}>
        <div className={styles.logo}>
          <img src={"/assets/chaiTubeLogo.png"} alt="logo" />
          <span>
            chaiTube
            <sup>IN</sup>
          </span>
        </div>
      </Link>
      <Search />
      <div className={styles.info}>
        <Link to={"/uploadVideo"} className={styles.Link}>
          <VideoCallOutlinedIcon />
        </Link>
        <NotificationsNoneIcon />
        {user ? (
          <>
            <SignOutButton />
            <Link to={"/channelSettings"} className={styles.Link}>
              <ChannelProfile imgLink={user.img} />
            </Link>
          </>
        ) : (
          <SignInButton />
        )}
      </div>

      <div className={styles.signIn}></div>
    </div>
  );
}
