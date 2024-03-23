import React, { useEffect, useState, useContext } from "react";
import styles from "./VideoPage.module.css";
import ChannelProfile from "../components/ChannelProfile";
import VideoRec from "../components/VideoRec";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import axios from "axios";
import {
  useLoaderData,
  Form,
  redirect,
  useNavigate,
  Link,
} from "react-router-dom";
import { userContext } from "../Context/userContext";
import { nanoid } from "nanoid";

export async function loader({ params }) {
  try {
    const response1 = await axios.get("/api/video/getVideo/" + params.videoId);
    const response2 = await axios.get(
      "/api/comments/getComments/" + params.videoId
    );
    const response3 = await axios.get("/api/video/getVideos");

    try {
      await axios.patch(`/api/video/increaseViews/${params.videoId}`);
    } catch (error) {
      console.error("Failed to increase views:", error.message);
    }

    return {
      video: response1.data.video,
      comments: response2.data.comments,
      videosData: response3.data.videos,
    };
  } catch (error) {
    console.error("Failed to get videos:", error.message);
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const { userId, commentText } = Object.fromEntries(formData);
  try {
    await axios.post("/api/comments/addComment/" + params.videoId, {
      userId,
      commentText,
    });

    document.querySelector("form").reset();
    return redirect("/videoPage/" + params.videoId);
  } catch (error) {
    console.error("Failed to add comment:", error.message);
    return null;
  }
}

export default function VideoPage() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [clickedInput, setClickedInput] = useState(false);
  const { video, comments, videosData } = useLoaderData();
  const [likes, setLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(0); // 0 for none, 1 for like, -1 for dislike
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(0);

  useEffect(() => {
    getLikes();
    getSubscriptions();
  }, [user]);

  const getLikes = async () => {
    try {
      const response = await axios.get("/api/video/getLikes/" + video.videoid);
      setLikes(response.data.likes);

      if (user) {
        const userLike = response.data.likes.find(
          (like) => like.userid === user.userid
        );
        if (userLike) {
          setLikeStatus(userLike.action_type);
        } else {
          setLikeStatus(0);
        }
      }
    } catch (error) {
      console.error("Failed to get likes:", error.message);
    }
  };

  const likeVideo = async () => {
    try {
      if (!user) {
        navigate("/signIn");
      }
      const actionType = likeStatus === 0 || likeStatus === -1 ? 1 : 0;
      const response = await axios.post(
        "/api/video/likeVideo/" + video.videoid,
        {
          userId: user.userid,
          actionType: actionType,
        }
      );
      console.log(response.data.message);
      getLikes();
    } catch (error) {
      console.error("Failed to like video:", error.message);
    }
  };

  const dislikeVideo = async () => {
    try {
      if (!user) {
        navigate("/signIn");
      }
      const actionType = likeStatus === 0 || likeStatus === 1 ? -1 : 0;
      const response = await axios.post(
        "/api/video/likeVideo/" + video.videoid,
        {
          userId: user.userid,
          actionType: actionType,
        }
      );
      console.log(response.data.message);
      getLikes();
    } catch (error) {
      console.error("Failed to dislike video:", error.message);
    }
  };

  const subscribe = async () => {
    try {
      if (!user) {
        navigate("/signIn");
      }
      if (subscriptionStatus === 1) {
        unsubscribe();
      }
      const actionType = 1;
      const response = await axios.post(
        `/api/video/subscription/${video.uploadedby}`,
        {
          subscriberId: user.userid,
          actionType: actionType,
        }
      );
      console.log(response.data.message);
      getSubscriptions();
    } catch (error) {
      console.error("Failed to subscribe:", error.message);
    }
  };

  const unsubscribe = async () => {
    try {
      if (!user) {
        navigate("/signIn");
      }
      const actionType = 0;
      const response = await axios.post(
        `/api/video/subscription/${video.uploadedby}`,
        {
          subscriberId: user.userid,
          actionType: actionType,
        }
      );
      console.log(response.data.message);
      getSubscriptions();
    } catch (error) {
      console.error("Failed to unsubscribe:", error.message);
    }
  };

  const getSubscriptions = async () => {
    try {
      const response = await axios.get(
        `/api/video/getSubscriptions/${video.uploadedby}`
      );

      setSubscriptions(response.data.subscriptions);
      if (user) {
        const userSubscription = response.data.subscriptions.find(
          (sub) => sub.subscriberid === user.userid
        );
        console.log(userSubscription);
        setSubscriptionStatus(userSubscription ? 1 : 0);
      }
    } catch (error) {
      console.error("Failed to get subscriptions:", error.message);
    }
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className={styles.VideoPage}>
      <div className={styles.video}>
        <video width="1236" height="695" controls>
          <source src={video.videourl} type="video/mp4" />
        </video>
        <div className={styles.videoTitle}>{video.title}</div>
        <div className={styles.videoReact}>
          <div className={styles.videoReactLeft}>
            <ChannelProfile imgLink={video.img} />
            <div className={styles.profileInfo}>
              <p className={styles.channelName}>{video.username}</p>
              <p className={styles.channelState}>
                {subscriptions.length} subscribers
              </p>
            </div>
            <div
              className={styles.subscribe + " " + styles.box}
              onClick={subscribe}
            >
              <SubscriptionsOutlinedIcon
                color={subscriptionStatus === 1 ? "primary" : "inherit"}
              />
              {subscriptionStatus === 1 ? "Subscribed" : "Subscribe"}
            </div>
          </div>
          <div className={styles.videoReactRight}>
            <div className={styles.thumbs + " " + styles.box}>
              <ThumbUpOutlinedIcon
                onClick={likeVideo}
                color={likeStatus === 1 ? "primary" : "inherit"}
              />
              <span>
                {likes.filter((like) => like.action_type === 1).length}
              </span>
              <div className={styles.vl}></div>
              <ThumbDownAltOutlinedIcon
                onClick={dislikeVideo}
                color={likeStatus === -1 ? "primary" : "inherit"}
              />
              <span>
                {likes.filter((like) => like.action_type === -1).length}
              </span>
            </div>
            <div className={styles.share + " " + styles.box}>
              <ReplyOutlinedIcon />
              Share
            </div>
            <div className={styles.save + " " + styles.box}>
              <PlaylistAddOutlinedIcon />
              Save
            </div>
          </div>
        </div>
        <div className={styles.description + " " + styles.box}>
          <div className={styles.videoStats}>
            {video.views} views • {formatDate(video.uploaddate)}
          </div>
          <div className={styles.descriptionContent}>{video.description}</div>
        </div>
        <div className={styles.comments}>
          <div className={styles.commentsHeader}>
            {comments.length} Comments
          </div>
          <div className={styles.inputComment}>
            <ChannelProfile imgLink={user?.img} />
            <Form className={styles.inputField} method="post">
              <input type="hidden" name="userId" value={user?.userid}></input>
              <input
                type="text"
                className={styles.addComment}
                placeholder="Add a comment..."
                name="commentText"
                onClick={() => {
                  setClickedInput(true);
                }}
              ></input>
              {clickedInput && (
                <div className={styles.addCommentOptions}>
                  <div
                    onClick={() => {
                      setClickedInput(false);
                    }}
                    className={styles.cancelComment}
                  >
                    Cancel
                  </div>
                  <button className={styles.commentSubmit} type="submit">
                    Comment
                  </button>
                </div>
              )}
            </Form>
          </div>
          <div className={styles.recentComments}>
            {comments?.map((comment) => {
              return (
                <div className={styles.comment} key={comment.commentid}>
                  <ChannelProfile imgLink={comment.img} />
                  <span className={styles.commentContent}>
                    <div>
                      <span className={styles.channelName}>
                        {comment.username} &nbsp;
                      </span>
                      <span>5 days ago</span>
                    </div>
                    <p>{comment.commenttext}</p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.recommendation}>
        {videosData?.map((video) => {
          return (
            <a href={`/videoPage/${video.videoid}`} key={nanoid()}>
              <VideoRec
                thumbnail={video.imgurl}
                title={video.title}
                channel={video.username}
                views={video.views}
                uploadDate={video.uploaddate}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
