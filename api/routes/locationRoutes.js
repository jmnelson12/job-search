const express = require("express");
const router = express.Router();
const locCtrl = require("../controllers/locationController");

router.route("/getZipCodes").get(locCtrl.getZipCodes);

module.exports = router;
