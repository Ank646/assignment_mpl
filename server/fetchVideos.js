const axios = require("axios");
const Video = require("./models/Video");
require("dotenv").config();

const API_KEYS = process.env.YOUTUBE_API_KEYS.split(",");
let currentInd = 0;


const getNextApiKey = () => {
  currentInd = (currentInd + 1) % API_KEYS.length;
  return API_KEYS[currentInd];
};

const fetchVideos = async () => {
  console.log("Fetching latest videos...");
  const query = process.env.SEARCH_QUERY || "technology"; 
  const publishedAfter = new Date(Date.now() - 60 * 1000).toISOString(); 

  const params = {
    part: "snippet",
    q: query,
    type: "video",
    order: "date",
    maxResults: 5,
    publishedAfter,
    key: API_KEYS[currentInd],
  };

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", { params });

    let newVideos = [];

    for (const item of response.data.items) {
      const videoData = {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        query,
      };

      
      const existingVideo = await Video.findOne({ videoId: videoData.videoId });

      if (!existingVideo) {
        
        await Video.create(videoData);
        newVideos.push(videoData);
      }
    }

    console.log(`Fetched ${newVideos.length} new videos.`);

    return newVideos; 
  } catch (error) {
    if (error.response?.status === 403) {
      console.log("Quota exceeded! Switching API key...");
      getNextApiKey();
    } else {
      console.error(" Error fetching videos:", error);
    }
    return [];
  }
};
module.exports = fetchVideos;
