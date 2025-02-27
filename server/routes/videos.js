const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const search = req.query.search || ""; 
    
    const query = search ? { title: new RegExp(search, "i") } : {}; 

    const totalVideos = await Video.countDocuments(query); 
    const totalPages = Math.ceil(totalVideos / limit); 
    const videos = await Video.find(query)
      .sort({ publishedAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(limit); 
console.log(videos);
    res.json({ success: true, count: videos.length, totalPages, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



module.exports = router;