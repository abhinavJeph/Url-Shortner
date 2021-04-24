const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: { type: String, require: true },
  longUrl: { type: String, require: true },
  shortUrl: { type: String, require: true },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model("Url", urlSchema);
