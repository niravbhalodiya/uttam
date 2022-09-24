const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const uploads = require("../utils");


router.post("/add-post", uploads.array("files", 5), userController.createPost);
router.get("/edit-post/:id", userController.editPost);
router.post("/upvote-post", userController.upVote);
router.post("/downvote-post", userController.downVote);
router.post("/solution", userController.postSolution);
router.post("/upvote-solution", userController.upVoteSolution);
router.post("/downvote-solution", userController.downVoteSolution);
router.post("/comment", userController.postComment);
router.post("/update-solution-status", userController.updateSolutionStatus);
router.get("/:userId", userController.getUser);
module.exports = router;