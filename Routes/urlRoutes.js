const express = require("express");
const router = express.Router();
const urlController = require("../Controllers/urlController");

// Shorten URL Endpoint
router.route("/shorten").post(urlController.shortenUrl);

// Redirect to Original URL
router.route("/:shortCode").get(urlController.redirectUrl);

module.exports = router;
