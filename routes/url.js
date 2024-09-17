const express = require("express");
const router = express.Router();

const {
  handleGenerateShortURL,
  handleGetShortURL,
  handleAnalytics,
} = require("../controllers/url");

router.route("/").post(handleGenerateShortURL);
router.route("/:shortId").get(handleGetShortURL);
router.route("/analytics/:shortId").get(handleAnalytics);

// or

// router.post("/", handleGenerateShortURL);
// router.get("/:shortId", handleGetShortURL);
// router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
