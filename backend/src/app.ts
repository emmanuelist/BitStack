import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
// Import other routes

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// Use other routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
