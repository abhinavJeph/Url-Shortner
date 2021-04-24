const express = require("express");
const router = express.Router();
const shortId = require("shortid");
const validURI = require("valid-url");
const config = require("config");

const Url = require("../models/url");

// @router POST /api/url/shorten
// @desc  Create Short Url

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  const baseUrl = config.get("baseUrl");
  if (!validURI.isUri(baseUrl)) {
    return res.status(401).json("Invalid Base Url");
  }
  // Generate short code
  const code = shortId.generate();

  if (validURI.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        /* url already present */

        // return res.status(200).json(url);    <-- for API
        return res.redirect("/");
      } else {
        // make new url
        url = new Url({
          urlCode: code,
          longUrl,
          shortUrl: baseUrl + "/" + code,
          clicks: 0,
        });
        await url.save();

        // return res.status(200).json(url);    <-- for API
        return res.redirect("/");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Internal Server Error");
    }
  } else {
    //   long URL not valid
    console.log(req.body);
    return res.status(401).json("Url is not valid");
  }
});

module.exports = router;
