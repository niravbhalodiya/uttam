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
router.post("/upvote", auth, userController.upVote);


module.exports = router;