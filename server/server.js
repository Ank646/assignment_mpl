require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const fetchVideos = require("./fetchVideos");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const videoRoutes = require("./routes/videos");


app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log(" New WebSocket Client Connected:", socket.id);
  console.log("Emitting new request to client...");

  
  socket.on("fetchVideos", async () => {
    const latestVideos = await fetchVideos();
    if (latestVideos.length > 0) {
      latestVideos.forEach((video) => {
        io.emit("new_video", video); 
        console.log("New video:", video.title);
      });
    } else {
      console.log("No new videos to emit.");
    }
  });

  socket.emit("message", "  Server connected to client!");
  socket.on("disconnect", () => {
    console.log("Client Disconnected:", socket.id);
  });
});


app.use("/api/videos", videoRoutes);


cron.schedule("*/10 * * * * *", async () => {
  console.log("Fetching new videos...");
  const latestVideos = await fetchVideos();

  if (latestVideos.length > 0) {
    latestVideos.forEach((video) => {
      io.emit("new_video", video); 
      console.log("Emitted new video:", video.title);
    });
  } else {
    console.log("No new videos found in this cycle.");
  }
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
