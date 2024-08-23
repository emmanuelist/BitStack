import express from "express";
import {
  createNewPost,
  likePostById,
  getPostById,
  getAllPosts,
} from "../controllers/postController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, createNewPost);
router.post("/:postId/like", authenticate, likePostById);
router.get("/:postId", getPostById);
router.get("/", getAllPosts);

export default router;
