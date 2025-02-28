const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, index: "text" }, 
    description: { type: String, index: "text" }, 
    publishedAt: { type: Date, index: true }, 
    thumbnailUrl: String,
    videoId: { type: String, unique: true, index: true }, 
    query: { type: String, index: true }, 
  },
  { timestamps: true }
);


videoSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Video", videoSchema);
