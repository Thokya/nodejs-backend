const asyncHandler = require("express-async-handler");

const Post = require("../models/Post");
const User = require("../models/User");

// @desc create post
// @route post /post
// @access private
const createPost = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const post = new Post({
            user_id: user._id,
            post_message: req.body.post_message,
            previous_message: [],
            is_active: true,
        });
        const savedPost = await post.save();
        res.status(201).send({
            message: "Post created successfully",
            post: savedPost,
        });

        res.json("");
    } catch (error) {
        res.status(500).send({
            err: "Internal server error",
            message: error.message,
        });
    }
});

// @desc create post
// @route put /post
// @access private
const editPost = asyncHandler(async (req, res) => {
    try {
        const post_id = req.params.post_id;
        const user_id = req.body.user_id;
        const post_message = req.body.post_message;

        const post = await Post.findOne({ _id: post_id, user_id: user_id });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.previous_message.push({
            message: post.post_message,
            timeStamp: Date.now(),
        });

        post.post_message = post_message;

        await post.save();

        res.json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// @desc delete post
// @route delete /post
// @access private
const deletePost = asyncHandler(async (req, res) => {
    const { post_id } = req.params;

    try {
        const post = await Post.findById(post_id);
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }

        await post.remove();
        res.send({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// @desc delete post
// @route delete /post
// @access private
const getAllPost = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.user_id;
        const posts = await Post.find({ user_id: userId });

        if (posts) {
            res.json(posts);
        } else {
            res.json("Not posts found");
        }
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

module.exports = {
    createPost,
    editPost,
    deletePost,
    getAllPost,
};
