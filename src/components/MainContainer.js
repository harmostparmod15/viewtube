import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const store = useSelector((store) => store?.app);
  return (
    <div
      className={
        "  pl-4 ml-8 dark:bg-black dark:text-white transition-all duration-1000 " +
        (store?.isMenuOpen && "ml-[12rem]  ")
      }
    >
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
