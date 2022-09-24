const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const uploads = require("../utils");


router.post("/add-post", uploads.array("files", 5), userController.createPost);
router.get("/edit-post/:id", userController.editPost);
router.post("/upvote", userController.upVote);


module.exports = router;