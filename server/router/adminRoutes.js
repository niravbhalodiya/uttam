const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/status/:status", adminController.getPostsByStatus);
router.post("/update-status", adminController.updatePostStatus);
router.post("/assign-reward-point", adminController.assignRewardPoints);

module.exports = router;