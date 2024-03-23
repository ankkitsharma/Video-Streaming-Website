import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import SignInButton from "./SignInButton";
import { userContext } from "../Context/userContext";

export default function Navbar() {
  const { user } = useContext(userContext);
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.Link}>
        <HomeIcon />
        Home
      </Link>
      <Link to="/" className={styles.Link}>
        <ExploreOutlinedIcon />
        Explore
      </Link>
      <Link to="/" className={styles.Link}>
        <SubscriptionsOutlinedIcon />
        Subscriptions
      </Link>
      <hr></hr>
      <Link to="/" className={styles.Link}>
        <VideoLibraryOutlinedIcon />
        Library
      </Link>
      <Link to="/" className={styles.Link}>
        <HistoryOutlinedIcon />
        History
      </Link>
      <hr></hr>
      {!user && (
        <>
          <div className={styles.signIn}>
            Sign in to like videos, comment, and subscribe. <SignInButton />
          </div>
          <hr></hr>
        </>
      )}
      <div className={styles.tagLine}>BEST OF CHAITUBE</div>
      <Link to="/" className={styles.Link}>
        <LibraryMusicIcon />
        Music
      </Link>
      <Link to="/" className={styles.Link}>
        <SportsBasketballOutlinedIcon />
        Sports
      </Link>
      <Link to="/" className={styles.Link}>
        <SportsEsportsOutlinedIcon />
        Gaming
      </Link>
      <Link to="/" className={styles.Link}>
        <MovieCreationOutlinedIcon />
        Movies
      </Link>
      <Link to="/" className={styles.Link}>
        <ArticleOutlinedIcon />
        News
      </Link>
      <Link to="/" className={styles.Link}>
        <LiveTvOutlinedIcon />
        Live
      </Link>
      <hr></hr>
      <Link to="/channelSettings" className={styles.Link}>
        <SettingsOutlinedIcon />
        Settings
      </Link>
      <Link to="/" className={styles.Link}>
        <FlagOutlinedIcon />
        Report
      </Link>
      <Link to="/" className={styles.Link}>
        <HelpOutlineOutlinedIcon />
        Help
      </Link>
      <Link to="/" className={styles.Link}>
        <SettingsBrightnessOutlinedIcon />
        Light Mode
      </Link>
    </div>
  );
}
