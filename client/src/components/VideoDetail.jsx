import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { fetchDataFromApi } from "../utils/Api";
import { Context } from "../context/ContextApi";

function VideoDetail() {
  const [video, setVideo] = useState(null);
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
      const videoRes = await fetchDataFromApi(`video/details/?id=${id}`);
      setVideo(videoRes);
    } catch (error) {
      console.error("Error fetching video details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-56px)] bg-white dark:bg-black p-4 md:p-8">
      <div className="w-full max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] flex flex-col">
     
        <div className="relative w-full  h-[600px] rounded-lg overflow-hidden shadow-lg">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width="100%"
            height="100%"
            className="rounded-lg"
            playing
          />
        </div>
 <h1 className="text-lg md:text-2xl font-semibold text-black dark:text-white mt-4 text-center">
          {/* {video?.title || "Loading..."} */}
        </h1>
      </div>
    </div>
  );
}

export default VideoDetail;
