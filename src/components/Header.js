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

import menuImage from "../images/menu.png";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [themeUpdate, setThemeUpdate] = useState(null);
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
    dispatch(clearSearchQueryResults());
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" +
        searchQuery +
        "&key= " +
        GOOGLE_API_KEY
    );

    const json = await data.json();

    dispatch(addSearchQueryResults(json));
    navigate("results");
  };

  // ADD DARK MODE
  const addDark = () => {
    setThemeUpdate(0);
    localStorage.setItem("theme", "dark");
  };

  // ADD LIGHT MODE
  const addLight = () => {
    setThemeUpdate(1);
    localStorage.setItem("theme", "light");
  };

  // GET THEME FROM LOCAL STORAGE AND ADD DARK MODE TO PAGE
  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const htmlTag = document.querySelector("html");

    if (userTheme === "dark") {
      htmlTag.classList.add("dark");
      document.querySelector(".light-logo").classList.remove("hidden");
      document.querySelector(".dark-logo").classList.add("hidden");
    } else if (userTheme === "light") {
      htmlTag.classList.remove("dark");
      document.querySelector(".light-logo").classList.add("hidden");
      document.querySelector(".dark-logo").classList.remove("hidden");
    }
  }, [themeUpdate]);

  return (
    <div className=" w-full md:w-screen flex justify-between p-5  shadow-lg transition-all duration-700 dark:bg-black">
      <div className="flex w-3/12 md:w-2/12   ">
        <img
          onClick={toggleMenuHandler}
          className="h-10 w-12 cursor-pointer rounde   "
          alt="menu"
          src={menuImage}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTQ5g7bDRjn-32JqTXGLUQJfXcPr4t4l_Aqw&usqp=CAU"
        />
        <a href="/" className="flex ">
          <img
            alt="logo"
            className="h-10 mx-2 rounded-full"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX/AAD/////Wlr/xsb/kZH/Z2f/Njb/l5f/GBj/+Pj/zs7/39//7e3/ISH//Pz/5ub/jY3/2dn/paX/goL/LCz/rq7/bW3/Dw//vr7/8/P/Jib/fn7/sLD/w8P/Ozv/4+P/SEj/QUH/t7f/c3P/hob/UVH/YWH/oKD/nJz/aWm7MlSsAAAC1klEQVR4nO3ba3eaQBSF4Yyk3gtqk6i5qWmi7f//gxUbkwPCAArr5JD3+aiurL2XzIwzkKsrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJoMp7O+dogGzSMXm2nnaE7g/lv+0k7SkJuBOxp1tMM0ouOE4Vw7TgMSDffDsX1TTqqhG7RuOKYb7ofjD+1M9TptuB+ON9qp6pTV0Lnbe+1c9clu6AbX2sFqk9PQuehOO1pNchs6N91oh6uFp6Fzj9rp6uBt6F6049XA39B1tfNdrqBhC6bUb99wrZ3vcv6GgXa8GngbtqGgr+F4Kz433/xUy3iZ/IY9+bEgdGFgc8uR1zCQm/3e+4u3ajEvkN0wkrvg3+PPC/dVLejZMhvKVXA9TLw1fVOLeqaMhoGcU15O3n4ydlh10jCSM+gkzPiGwz9qac+RahjKGfQuyrqEXWqYfnXJhguxIHSHOf1iUzubDtkwkrPIo6dfzMzK0V8eIycOn16XvnYHZm7l7I4XqDhA3I4K+x0uVSNnjof1YCXuO90HRdWOVnqpK+n2dmJunM/K9tuzcqFKD8UDUDAz3Xx4KzcAP1g7buwvqvVzzti5eK+4UcpUO3IlYo9U1pOlm+LP08r9BpYu0XnlAWhskrnO2iP5rSw9mdLJ2yN5mNohbqv3M7R1ilX+Bq09j7KuWjCwdjJccGcmbflXO3Bl1Rra+6VdreHK3FlprELDXvFf+4pKNzS2RHwq2XDwoB30bOUamtpFpJRpOLZ0xH2iREOLS4RQ2HC01o54oaKG9h+o8TccWl0iBF9Dw0uE4Gm4MLxECPnPCNvbRWTLa2h8iRCyG45aMMMcZTUMJ9qp6pTRsA1LhHDSMLR0lF1GuuFCO1Dtkg1NPShTUqLhTjtNEzZiiXjWDtOM4221di0R0vuhd7v+5zApfn5t1bYlAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKjHP13jF+J7YKddAAAAAElFTkSuQmCC"
          ></img>

          <h1 className=" dark:bg-gradient-to-r from-[#7AF55C] via-[#5AD3AD] to-[#3BB6E9]      dark:text-transparent dark:bg-clip-text    relative  font-extrabold  text-4xl hidden md:flex">
            VIEWTUBE
          </h1>
        </a>
      </div>
      {/*  SEARCH BOX */}
      <div className=" md:px-10 md:ml-60 md:w-9/12 w-6/12  ">
        <div>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            value={searchQuery}
            placeholder="Search for Videos"
            className="w-32 md:w-8/12 border border-gray-400 p-2 px-4 rounded-l-full placeholder-gray-400"
            type="text"
          />
          <button
            onClick={autoSearchApiCall}
            className="w-8 md:w-32 border border-gray-400 md:px-8 bg-gray-100 py-2 rounded-r-full"
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
      {/*  THEME BOX */}
      <div className=" md:w-1/12 text-center">
        <img
          onClick={addDark}
          className="w-9 cursor-pointer dark-logo "
          alt="logo"
          src="data:image/png;base64,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"
        ></img>
        <img
          onClick={addLight}
          className="w-9 cursor-pointer light-logo hidden "
          alt="logo"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUaGhr///8AAAAJCQkYGBgVFRUbGxsRERF1dXUQEBDHx8dHR0fv7+/Dw8P7+/twcHDe3t6zs7OioqIvLy8nJye7u7tkZGQ8PDytra3Pz8/k5ORqamqampohISFPT0+Ojo6CgoJXV1ddXV04mqmCAAAFH0lEQVR4nO2dbZuqIBCGdRSJMnsv23Zr2///I0/2CmponlSg577223YZj8AwM8DkeQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+mTAM+25Cq3AKlgHxvpvRHrRfxXG82lPfDWmJiH4TPyP5dVRisPZvrIO+G9MK9HVX+OVkJ7KN/2DD+m5OCwQTSeHExWEaDCSFAyi0ESi0Hyi0H7GWFK5F381pgVBICoWFMVQYEOnjIprdBc60Xhs/PSkw7hUEfDdPDyPSNIz9TK8Cpz8apy2k0SGd74RhM5WO59YnKWnaLhbjs8DxQtPXjNJzjDU9GuWdB8fk2j1DnURG+0N62Os/Mrw+KTka1IuhmN6nmFbieYrpJutD4KkXuTlzUewkMzkUOonR+e8ZTAylJ+3M6USa+7LExu+ecVmgPyfNy+gWSn1Fos6iaghJEein5tgaOigt8w/Nmvamx7QBHyVK0+KGCmPlKcnIoMRqbpj6jdrGR+pDDBqkxRn018SxFn9vmc0twVSJm0Z9uFEFGpaOUyQ2TIdKCVXzBKqLdXl8y7Lo40J55CDFyHq3oScey/W82IVZbLUYfM/G2+12nH4PFqUq757DkBlkRh8wOmTm/mtQEMiJT1bqUhCvJoLyzk9Ig2ygxgfzhugVotHfhvJDVNBopq6XF5LZiPI2N6DN34jMsqIqvDB/GB3HJfIujE+RlOp7RkwYOUCfQ8vS/nv049Ic97oRtIs1+s4TcmeS6/IqTA2rnjA31q5UEXE2rNbnG7s2VMN/trUE+v72x0qJjNcVeJLIbRyoVG+IXgeqheamlpF5UOLpGQ7tqlUp2LZosGXVOpgnXto1FaVdmLrod2tMQxx1rlo5yd6mPUV67mw/Z2xRJ+azZjUxKXtYQYNZmGHPTAz567MwI7Fm71s5wfYK1px2o1VDhSvDhikPLhTGFr262t8o7HeE4voVPXgDkaDNZHBmLdRkC1s0FOj7C1lJxIivL18xKea3WofWUoJ6psR3yuGn11BSyeJHMslf645HMP0qLZvKL5++Gyv8lmSwxVT5X7fH38U+tx7I/kjD1TBDXhHzflGy79IhKFpL6esbuWwXpBfF9/l/dmlpw6BgLaUdaaqfvcizlZ5yyP8z7tDYhMXob/52hYUcQZcRpPt92OI8vC+sotd5eDIDOlua5ttWG70t7TRC7mA95L2uh0WfRnLb3uXT8F59mvNe5s0v5eqOZvgmv9RjJHr0S71OY4vArExj5Ex8+BT3Y3z38zTu59o+IF8aOp/zLkbINbBr38L9vadm+4dWHR2KnN8D/oB9/A84i+Ex9sJ5GmaWa10T5vqZqJNr4/q5NvfPJma4fr7Uqzwj7M+WlgksO+e915/zLjzB4EkZ3s7qq+6X/qy+/NnodlZfd8+0Rx73LfKhOidRet8iF0xEntn3LercmUnVOzP5nnrcmTHxRO1r955KBcj3ngzLH3ov3V17OseMvruWv3/YpHlG3z8MgzbukL69mf+B8/eA3b/L7f59/DfVVMinBVJzrrXl62I0tIJRoS7Ge5v5HwRqbZPm04cHhtY2CXnN+jRhRX2ayNT6NEqNIW2FpEuNIe1HjKwx9AF1olqo9cWN6sEM5+u1VWN9zb1K3K+b6H7tSyi0Hyi0nw9Q6HxNdvfr6rv/2wiyU7MOjMlPvBXnf6PEi1z/nRnv9ltBLnrddyLHf+4JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCX/AAPDQUGZFNGXAAAAAElFTkSuQmCC"
        ></img>
      </div>
      <div className="md:w-1/12  ">
        <img
          className="h-8 -z-10 rounded-full"
          alt="user-icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQe9n1E5q9Sm_SIKKhl0qVvQclbyxyqSydA&usqp=CAU"
        ></img>
      </div>
    </div>
  );
};

export default Header;
