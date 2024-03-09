import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  convertToInternationalCurrencySystem,
  convertToNoOfDaysPosted,
} from "../utils/helper";
import { YT_AUTHOR_THUMBNAIL } from "../utils/constants";

const VideoCard = ({ info }) => {
  const store = useSelector((store) => store?.app);

  const [authorThumbnail, setAuthorThumbnail] = useState("");

  const { snippet, statistics } = info;

  const { channelTitle, channelId, title, thumbnails, publishedAt } = snippet;

  const formattedViewsCount = convertToInternationalCurrencySystem(
    statistics?.viewCount
  );

  const formattedPublishAt = convertToNoOfDaysPosted(publishedAt);

  // get author details api call
  const getAuthor = async () => {
    const data = await fetch(YT_AUTHOR_THUMBNAIL + "&id=" + channelId);
    const json = await data.json();
    setAuthorThumbnail(json?.items[0]?.snippet?.thumbnails?.default?.url);
  };

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <div
      className={
        "p-2 mx-10 md:m-2 w-96  " + (!store?.isMenuOpen && "w-[20rem]")
      }
    >
      <img
        className="rounded-lg w-full  "
        alt="thumbnail"
        src={thumbnails?.medium?.url}
      ></img>
      <ul className=" h-32 mt-1">
        {/*  channel name and thmbnail */}
        <div className="flex gap-2 py-2">
          <img
            alt="logo"
            className="rounded-full w-9 h-9 object-cover "
            src={authorThumbnail}
          ></img>
          <li className="font-bold  ">{title}</li>
        </div>

        <li className="text-sm">{channelTitle}</li>

        <ul className="flex gap-2 text-sm">
          <li>{formattedViewsCount} views •</li>
          <li> {formattedPublishAt} days</li>
        </ul>
      </ul>
    </div>
  );
};

export default VideoCard;
