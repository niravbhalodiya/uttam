const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const uploads = require("../utils");
const auth = require("../middleware/auth")


router.get("/get-all-posts",userController.getAllPosts)
// router.get("/get-single-user", userController.getSingleUser);
router.post("/add-post",auth, userController.createPost);
router.get("/editpost/:postId",auth, userController.getEditPost);
router.post("/editpost/:postId",auth, userController.postEditPost);
router.post("/delete-post",auth, userController.postDeletePost);
router.post("/upvote-post", userController.upVote);
router.post("/downvote-post", userController.downVote);
router.post("/solution", userController.postSolution);
router.post("/upvote-solution", auth, userController.upVoteSolution);
router.post("/downvote-solution", userController.downVoteSolution);
router.post("/comment", userController.postComment);
router.post("/update-solution-status", userController.updateSolutionStatus);
router.get("/:userId", userController.getUser);
module.exports = router;