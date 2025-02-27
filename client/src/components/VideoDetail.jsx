import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/Api";
import { Context } from "../context/ContextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

function VideoDetail() {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [videoRes, relatedRes] = await Promise.all([
        fetchDataFromApi(`video/details/?id=${id}`),
        fetchDataFromApi(`video/related-contents/?id=${id}`),
      ]);
      setVideo(videoRes);
      setRelatedVideos(relatedRes?.contents || []);
    } catch (error) {
      console.error("Error fetching video details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-white dark:bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        {/* Video Player Section */}
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={''}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000" }}
              playing
            />
          </div>
       
          <div className="text-black dark:text-white font-semibold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title || "Loading..."}
          </div>
         <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="h-11 w-11 rounded-full overflow-hidden">
                  <img
                    src={video?.author?.avatar?.[0]?.url || ""}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                {/* <div className="text-black dark:text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges?.some((badge) => badge.type === "VERIFIED_CHANNEL") && (
                    <BsFillCheckCircleFill className="text-black/[0.5] dark:text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div> */}
                <div className="text-black/[0.7] dark:text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText || "No subscribers info"}
                </div>
              </div>
            </div>

             <div className="flex text-black dark:text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl dark:bg-white/[0.15] bg-black/[0.2]">
                <AiOutlineLike className="text-xl dark:text-white text-black mr-2" />
                {`${abbreviateNumber(video?.stats?.likes || 0, 2)} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl dark:bg-white/[0.15] bg-black/[0.2] ml-4">
                {`${abbreviateNumber(video?.stats?.views || 0, 2)} Views`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] hide">
          {relatedVideos.length > 0 ? (
            relatedVideos.map((item) => {
              if (item?.type !== "video") return null;
              return <SuggestionVideoCard key={item?.video?.videoId} video={item?.video} />;
            })
          ) : (
            <p className="text-gray-500 text-center">No related videos found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
