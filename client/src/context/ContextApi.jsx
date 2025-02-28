
import { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/Api";
import socket from "./socket";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchVideos(page, searchQuery);
  }, [page, searchQuery]); 

  useEffect(() => {
    socket.on("new_video", (newVideo) => {
      console.log("New video received:");
      if (newVideo && newVideo.videoId) {
        setSearchResult((prevVideos) => {
          const updatedVideos = [newVideo, ...prevVideos]; 
          return updatedVideos.slice(0, 8); 
        });  }
    });

    return () => {
      socket.off("new_video");
    };
  }, []);

  
  const fetchVideos = async (page, search) => {
    setLoading(true);
    try {
       console.log(`Fetching: page=${page}, search="${search}"`);
  
      const response = await fetchDataFromApi(`?page=${page}&limit=8&search=${search}`);
      console.log("API Response:", response);
  
      if (response.success) {
        console.log("Setting searchResult with new videos");
        console.log("Getting......")
        setSearchResult(response.videos); 
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };
  

  
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      window.scrollTo(0, 0); 
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Context.Provider
      value={{
        loading,
        searchResult,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        totalPages,
        handleNextPage,
        handlePrevPage,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {children}
    </Context.Provider>
  );
};
