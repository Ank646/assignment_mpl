const mongoose = require("mongoose");

const videSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    publishedAt: { type: Date, index: true },
    thumbnailUrl: String,
    videoId: { type: String, unique: true },
    query: String, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videSchema);
