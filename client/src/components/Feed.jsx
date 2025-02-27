import { useContext, useEffect } from "react";
import { Context } from "../context/ContextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResult, page, setPage, totalPages } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading && searchResult.length > 0 ? (
            searchResult.map((video) => <VideoCard key={video.videoId} video={video} />)
          ) : (
            !loading && <p className="text-center text-gray-500">No videos found</p>
          )}
        </div>

        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-black dark:text-white">Page {page} of {totalPages}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
