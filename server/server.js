// Load environment variables from a .env file for application configuration.
require("dotenv").config();

// Import Express to create and manage the server, and Mongoose for database operations with MongoDB.
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // Add this import
const mongoSanitize = require("express-mongo-sanitize");

// Import route handlers to manage requests for different entities within the application.
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const coinRoutes = require("./routes/coin");
const walletRoutes = require("./routes/wallet");

// Initialise the Express app to configure middleware and routes.
const app = express();

console.log("===== SERVER STARTUP =====");
console.log("Environment:", process.env.NODE_ENV || "development");
console.log("MongoDB URI exists:", !!process.env.MONGO_URI);
console.log("Secret exists:", !!process.env.SECRET);
console.log("Port:", process.env.PORT);

// CORS middleware - Updated for production
app.use((req, res, next) => {
  console.log("CORS middleware - Origin:", req.headers.origin);

  // Allow localhost in development and your domain in production
  const allowedOrigins = [
    "http://localhost:3000",
    "https://cryptocurrency.jackgriffin.dev",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else if (process.env.NODE_ENV === "production") {
    // In production, only allow the specific domain
    res.header("Access-Control-Allow-Origin", "https://cryptocurrency.jackgriffin.dev");
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    console.log("CORS preflight request handled");
    return res.sendStatus(200);
  }

  next();
});

// Middleware to parse JSON bodies of incoming requests, enabling easy access to request data.
app.use(express.json());

// Sanitize user input to prevent NoSQL injection attacks
app.use(mongoSanitize());

// Enhanced middleware for logging request details
app.use((request, response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ${request.method} ${request.originalUrl}`);
  console.log(
    `User-Agent: ${request.headers["user-agent"]?.substring(0, 50)}...`
  );
  console.log(`Origin: ${request.headers.origin || "No origin"}`);
  console.log(
    `Content-Type: ${request.headers["content-type"] || "No content-type"}`
  );

  if (request.body && Object.keys(request.body).length > 0) {
    console.log(`Body keys: [${Object.keys(request.body).join(", ")}]`);
  }

  next(); // Proceed to the next middleware or route handler.
});

// Define base paths for API routes, organising the server's endpoint structure.
console.log("Setting up routes...");

app.use(
  "/api/admin",
  (req, res, next) => {
    console.log("Admin route accessed:", req.originalUrl);
    next();
  },
  adminRoutes
);

app.use(
  "/api/user",
  (req, res, next) => {
    console.log("User route accessed:", req.originalUrl);
    next();
  },
  userRoutes
);

app.use(
  "/api/coins",
  (req, res, next) => {
    console.log("Coin route accessed:", req.originalUrl);
    next();
  },
  coinRoutes
);

app.use(
  "/api/wallet",
  (req, res, next) => {
    console.log("Wallet route accessed:", req.originalUrl);
    next();
  },
  walletRoutes
);

// PRODUCTION: Serve static files from React build
if (process.env.NODE_ENV === "production") {
  console.log("Setting up production static file serving...");

  // Serve static files from the React build directory
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Catch-all handler: send back React's index.html file for client-side routing
  // This must come AFTER your API routes
  app.get("*", (req, res) => {
    console.log("Serving React app for route:", req.originalUrl);
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  console.log("Production static file serving configured");
} else {
  // Add a catch-all route for debugging 404s (development only)
  app.use("*", (req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    console.log(
      `Available routes: /api/admin, /api/user, /api/coins, /api/wallet`
    );
    res.status(404).json({
      error: "Route not found",
      requestedRoute: req.originalUrl,
      method: req.method,
      availableRoutes: ["/api/admin", "/api/user", "/api/coins", "/api/wallet"],
    });
  });
}

console.log("Routes configured successfully");

// Connect to the MongoDB database using a URI stored in environment variables for security.
console.log("Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Database name:", mongoose.connection.name);

    // Start the server to listen on a specific port after a successful database connection.
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

      if (process.env.NODE_ENV === "production") {
        console.log("Production server ready");
        console.log("API endpoints available at /api/*");
        console.log("Serving React app for all non-API routes");
      } else {
        console.log(`Development server running`);
        console.log(`API available at: http://localhost:${PORT}/api`);
        console.log(`User routes: http://localhost:${PORT}/api/user`);
        console.log(`Admin routes: http://localhost:${PORT}/api/admin`);
        console.log(`Coin routes: http://localhost:${PORT}/api/coins`);
        console.log(`Wallet routes: http://localhost:${PORT}/api/wallet`);
      }

      console.log("Server ready to accept connections!");
      console.log("===== SERVER STARTUP COMPLETE =====\n");
    });
  })
  .catch((error) => {
    // Log any errors encountered during the database connection attempt.
    console.error("MongoDB connection failed!");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  });
