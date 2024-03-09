import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleMenu } from "../utils/appSlice";
import { useNavigate } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import {
  addSearchQueryResults,
  cacheResutls,
  clearSearchQueryResults,
} from "../utils/searchSlice";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const searchCache = useSelector((store) => store.search?.results);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      cacheResutls({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const autoSearchApiCall = async () => {
    console.log("yh h api querry", searchQuery);
    dispatch(clearSearchQueryResults());
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" +
        searchQuery +
        "&key= " +
        GOOGLE_API_KEY
    );

    const json = await data.json();
    console.log("auto search result", json);

    dispatch(addSearchQueryResults(json));
    navigate("results");
  };

  return (
    <div className="w-screen flex justify-between p-5 m-2 shadow-lg">
      <div className="flex w-2/12    ">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer    "
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            alt="youtube-logo"
            className="h-8 mx-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className=" px-10 ml-60 w-9/12  ">
        <div>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            value={searchQuery}
            placeholder="Search for Videos"
            className="w-8/12 border border-gray-400 p-2 px-4 rounded-l-full placeholder-gray-400"
            type="text"
          />
          <button
            onClick={autoSearchApiCall}
            className="border border-gray-400 px-8 bg-gray-100 py-2 rounded-r-full"
          >
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="   fixed bg-white py-2 px-4 w-2/6 shadow-lg rounded-lg border border-gray-100 ">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  onMouseOver={() => setSearchQuery(suggestion)}
                  key={suggestion}
                  className=" cursor-pointer z-20 relative  py-2 px-3 shadow-sm hover:bg-gray-100 "
                >
                  {" "}
                  🔍 {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-1/12  ">
        <img
          className="h-8"
          alt="user-icon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        ></img>
      </div>
    </div>
  );
};

export default Header;
