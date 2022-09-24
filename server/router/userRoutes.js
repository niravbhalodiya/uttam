const express = require("express");
const router = express.Router();


const uploads = require("../utils");

// const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController")


router.post("/addpost", uploads.array("files",5) ,userController.createPost);



module.exports = router;