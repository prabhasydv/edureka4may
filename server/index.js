import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Fix for __dirname in ES Modules
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";


dotenv.config();

// Call database connection
connectDB();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true, // Allow cookies if needed
  })
);

// Serve static files from the React build directory
const buildPath = path.join(__dirname, "../client/dist");
app.use(express.static(buildPath));


// APIs
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Catch-all route to serve React's index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
