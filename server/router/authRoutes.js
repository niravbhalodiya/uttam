const express = require("express");
const router = express.Router();



const authController = require("../controllers/authController")



router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/forgot-password", authController.askResetPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.post("/logout", authController.postLogout);



module.exports = router;