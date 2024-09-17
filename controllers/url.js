const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateShortURL = async (req, res) => {
  const body = req.body;
  const ShortId = shortid();
  if (!body.url) return res.status(400).send({ error: "url not present" });
  URL.create({
    shortId: ShortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  const allUrls = await URL.find({});
  res.render("home", { urls: allUrls });
  // res.render("home");
  // res.send({ id: ShortId });
};

const handleGetShortURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  res.send({
    TotalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateShortURL,
  handleGetShortURL,
  handleAnalytics,
};
