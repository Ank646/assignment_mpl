import axios from "axios";

const BASE_URL = "http://localhost:3000/api/videos";

export const fetchDataFromApi = async (queryParams = "") => {
  try {
    console.log(`Fetching: ${BASE_URL}${queryParams}`);
    const { data } = await axios.get(`${BASE_URL}${queryParams}`);

    return data;
  } catch (error) {
    console.error("Error fetching videos from backend:", error);
    return { success: false, videos: [], totalPages: 1 };
  }
};
