import React from "react";
import { convertToNoOfDaysPosted } from "../utils/helper";
import { useSelector } from "react-redux";

const SearchResultVideoCard = ({ info }) => {
  const store = useSelector((store) => store?.app);

  const { snippet } = info;

  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  const formattedPublishAt = convertToNoOfDaysPosted(publishedAt);

  return (
    <div
      className={
        "  p-2 m-2 w-[70rem]  flex justif gap-8 " +
        (!store?.isMenuOpen && "w-[40rem]")
      }
    >
      <img
        className="rounded-lg w-4/12 "
        alt="thumbnail"
        src={thumbnails?.medium?.url}
      ></img>
      <ul className="w-7/12 h-32 mt-1">
        <li className="font-bold py-1 ">{title}</li>
        <li className="text-sm">{channelTitle}</li>

        <ul className="flex gap-2 text-sm">
          <li> {formattedPublishAt} days</li>
        </ul>
      </ul>
    </div>
  );
};

export default SearchResultVideoCard;
