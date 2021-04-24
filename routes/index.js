const express = require("express");
const router = express.Router();

const Url = require("../models/url");

router.get("/", async (req, res) => {
  const all_url = await Url.find({});
  res.render("index", { all_url });
});

// @route GET /:code
// @desc redirect to long/Original Url
router.get("/:code", async (req, res) => {
  try {
    let url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      url.clicks++;
      url.save();
      res.redirect(url.longUrl);
    } else {
      res.status(404).json("Url not found");
    }
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;
