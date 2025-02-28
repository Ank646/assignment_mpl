import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
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
       
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000" }}
              playing
            />
          </div>

          <div className="text-black dark:text-white font-semibold text-sm md:text-xl mt-4 line-clamp-2">
            {/* {video?.title || "Loading..."} */}
          </div>
        </div>

        {/* <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] hide">
          {relatedVideos.length > 0 ? (
            relatedVideos.map((item) => {
              if (item?.type !== "video") return null;
              return <SuggestionVideoCard key={item?.video?.videoId} video={item?.video} />;
            })
          ) : (
            <p className="text-gray-500 text-center">No related videos found.</p>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default VideoDetail;
