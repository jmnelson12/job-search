const express = require("express");
const router = express.Router();
const locCtrl = require("../controllers/locationController");

router.route("/getLocationInfo").get(locCtrl.getLocationInfo);

module.exports = router;
