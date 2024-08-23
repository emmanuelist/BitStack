import { Request, Response } from "express";
import Post, { IPost } from "../models/Post";
import { createPost, likePost } from "../services/stacksService";

export const createNewPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const author = req.user.stxAddress; // Assuming we have authentication middleware

    // Create post on Stacks blockchain
    const stacksResult = await createPost(author, content);
    if (!stacksResult.success) {
      return res
        .status(500)
        .json({ message: "Failed to create post on Stacks" });
    }

    // Create post in MongoDB
    const newPost: IPost = new Post({
      postId: stacksResult.postId,
      author,
      content,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const likePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const liker = req.user.stxAddress; // Assuming we have authentication middleware

    // Like post on Stacks blockchain
    const stacksResult = await likePost(liker, parseInt(postId));
    if (!stacksResult.success) {
      return res.status(500).json({ message: "Failed to like post on Stacks" });
    }

    // Update like count in MongoDB
    const updatedPost = await Post.findOneAndUpdate(
      { postId: parseInt(postId) },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ postId: parseInt(postId) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 }).limit(50);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
