// This file is only used in development with Create React App
// In production, the Express server handles serving both API and static files
// You can delete this file if you're only deploying to production

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Only apply proxy in development
  if (process.env.NODE_ENV === "development") {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:4000",
        changeOrigin: true,
        // Don't include any pathRewrite - let it pass through as-is
      })
    );
  }
};
