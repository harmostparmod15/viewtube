import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResultPage = () => {
  const searchResult = useSelector(
    (store) => store?.search?.searchQueryResults
  );
  const isMenuBarOpen = useSelector((store) => store?.app?.isMenuOpen);

  const videos = searchResult?.items;

  if (!videos)
    return (
      <div className="w-5/12 mx-auto    h-20 py-40  ">
        <h1 className="text-center text-2xl font-bold ">Loading...</h1>
        <div className=" mx-auto  border-8 border-gray-200  border-t-8 border-t-red-700  rounded-full h-20 w-20 animate-spin   "></div>
      </div>
    );

  return (
    <div className={isMenuBarOpen && "ml-[14rem]"}>
      <div className=" pl-4 py-20 font-bold text-4xl  flex  h-20 items-baseline">
        <h1>Search Results</h1>
        <h1>({searchResult?.pageInfo?.totalResults})</h1>
      </div>
      <div className="flex flex-col mx-auto ml-24 flex-wrap">
        {videos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video?.id?.videoId}>
            {console.log("search result ", video)}
            {/* <VideoCard info={video} /> */}
            <SearchResultVideoCard info={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
