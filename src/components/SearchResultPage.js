import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const SearchResultPage = () => {
  const videos = useSelector((store) => store?.search?.searchQueryResults);

  if (!videos)
    return (
      <div className="w-5/12 mx-auto    h-20 py-40  ">
        <h1 className="text-center text-2xl font-bold ">Loading...</h1>
        <div className=" mx-auto  border-8 border-gray-200  border-t-8 border-t-red-700  rounded-full h-20 w-20 animate-spin   "></div>
      </div>
    );

  return (
    <div>
      <h1 className="pl-8 text-4xl font-bold py-12 ">Your Results</h1>
      <div className="flex flex-wrap">
        {videos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
