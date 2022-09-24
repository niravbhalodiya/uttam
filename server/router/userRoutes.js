const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const uploads = require("../utils");


router.post("/addpost", uploads.array("files", 5), userController.createPost);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);



module.exports = router;