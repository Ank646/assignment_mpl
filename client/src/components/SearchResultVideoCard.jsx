import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns"; // For human-readable time

function SearchResultVideoCard({ video }) {
  const formattedTime = video?.publishedAt
    ? formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })
    : "Unknown Time";

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col md:flex-row mb-8 md:mb-3 dark:lg:hover:bg-white/[0.1] lg:hover:bg-black/[0.1] rounded-xl md:p-4 transition-all duration-300">
         <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            src={video?.thumbnailUrl}
            alt={video?.title}
          />
          {video?.duration && (
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </span>
          )}
        </div>

        <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className="text-lg md:text-xl font-semibold line-clamp-2 text-black dark:text-white">
            {video?.title}
          </span>
     <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-black/[0.7] dark:text-white/[0.7] md:pr-24 md:my-4">
            {video?.description}
          </span>
    <div className="flex items-center text-sm font-semibold text-black/[0.7] dark:text-white/[0.7] truncate">
            <span className="truncate">{formattedTime}</span>
            {video?.isVerified && (
              <BsFillCheckCircleFill className="ml-2 text-blue-500" title="Verified Channel" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultVideoCard;
