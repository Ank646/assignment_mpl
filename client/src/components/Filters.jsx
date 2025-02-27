import { useContext } from "react";
import { Context } from "../context/ContextApi";

const Filters = () => {
  const { selectedCategory, setSelectedCategory, sortBy, setSortBy, dateFilter, setDateFilter } = useContext(Context);

  return (
    <div className="flex flex-wrap gap-4 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
    
      <select
        className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {["Technology", "Sports", "Gaming", "Music", "News"].map((cat) => (
          <option key={cat} value={cat.toLowerCase()}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date">Newest</option>
        <option value="views">Most Viewed</option>
      </select>

     
      <select
        className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      >
        <option value="any">Any Time</option>
        <option value="24h">Last 24 Hours</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
      </select>
    </div>
  );
};

export default Filters;
