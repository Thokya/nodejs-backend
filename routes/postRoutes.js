const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.route("/")
    .get(postController.getAllPost)
    .post(postController.createPost)
    .put(postController.editPost)
    .delete(postController.deletePost);

module.exports = router;
