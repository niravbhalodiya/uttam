const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const uploads = require("../utils");


router.post("/add-post", uploads.array("files", 5), userController.createPost);
router.get("/editpost/:postId", userController.getEditPost);
router.post("/editpost/:postId", userController.postEditPost);
router.post("/delete-post", userController.postDeletePost);
router.post("/upvote", userController.upVote);


module.exports = router;