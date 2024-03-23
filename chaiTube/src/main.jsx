import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Index from "./pages/Index.jsx";
import SignIn from "./pages/SignIn.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import VideoPage, {
  loader as videoLoader,
  action as videoAction,
} from "./pages/VideoPage.jsx";
import ErrorPage from "./pages/error-page.jsx";
import ChannelSettings from "./pages/ChannelSettings.jsx";
import UploadVideo from "./pages/UploadVideo.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "/signIn",
            element: <SignIn />,
          },
          {
            path: "/videoPage/:videoId",
            element: <VideoPage />,
            loader: videoLoader,
            action: videoAction,
          },
          {
            path: "/channelSettings",
            element: <ChannelSettings />,
          },
          {
            path: "/uploadVideo",
            element: <UploadVideo />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
