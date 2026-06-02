import PostModel from "../models/Post.js";
import { PostController } from "./index.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(500);
    res.status(500).json({
      message: "Failed to get tags",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(500);
    res.status(500).json({
      messgae: "Failed to get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findByIdAndUpdate(
      postId,
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        new: true,
      },
    ).populate("user");

    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to get post",
    });
  }
};

export const getSorted = async (req, res) => {
  try {
    const sortBy = req.query.sort;

    if (sortBy === "top") {
      const sortedPosts = await PostModel.find().sort({ viewsCount: -1 });
      return res.json(sortedPosts);
    }

    if (sortBy === "recent") {
      const sortedPosts = await PostModel.find().sort({ createdAt: -1 });
      return res.json(sortedPosts);
    }

    res.status(400).json({
      message: "Unknown sorting type",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to get sorted posts",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findByIdAndDelete({
      _id: postId,
    });

    if (!doc) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove a post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create the article",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.body.user,
        tags: req.body.tags,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status.json({
      message: "Failed to update a post",
    });
  }
};
