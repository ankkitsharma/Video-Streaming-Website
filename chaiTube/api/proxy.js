// api/proxy.js
import { createProxyMiddleware } from "http-proxy-middleware";

export default (req, res) => {
  const proxy = createProxyMiddleware({
    target: "https://chai-server.vercel.app",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  });
  return proxy(req, res);
};
