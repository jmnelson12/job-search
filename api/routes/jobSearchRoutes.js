const express = require("express");
const router = express.Router();
const jobSearchCtrl = require("../controllers/jobSearchController");

// get all
router.route("/getAllJobs").get(jobSearchCtrl.getAllJobs);

// get from specific site
router.route("/getGlassdoorJobs").get(jobSearchCtrl.getGlassdoorJobs);
router.route("/getIndeedJobs").get(jobSearchCtrl.getIndeedJobs);
router.route("/getLinkedinJobs").get(jobSearchCtrl.getLinkedinJobs);

module.exports = router;
