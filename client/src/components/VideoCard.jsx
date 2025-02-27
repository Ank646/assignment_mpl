/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";

function VideoCard({ video }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-52 rounded-2xl overflow-hidden bg-gray-300 dark:bg-gray-800">
          <img
            src={
              video?.thumbnailUrl
                ? `${video.thumbnailUrl.replace("hqdefault", "maxresdefault")}`
                : "https://via.placeholder.com/640x360"
            }
            alt={video?.title || "No Title"}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="flex mt-3">
          <div className="flex items-start">
            <div className="flex flex-col ml-3 overflow-hidden">
              <span className="text-sm font-semibold line-clamp-2 text-black dark:text-white">
                {video?.title || "Untitled Video"}
              </span>
              <div className="flex text-[12px] font-semibold text-black/[0.7] dark:text-white/[0.7] truncate">
                <span>
                  {video?.publishedAt
                    ? new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(video.publishedAt))
                    : "Unknown date"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
