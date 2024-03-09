import React from "react";
import Button from "./Button";

const buttonNameList = [
  "All",
  "Mixes",
  "Music",
  "Live",
  "Motivation",
  "Reverbation",
  "Overhead press",
  "Ambient Music",
  "Combat sports",
  " Sports cars",
  "Calisthenices",
];

const ButtonList = () => {
  return (
    <div className="w-full flex overflow-x-scroll ml-2 ">
      {buttonNameList.map((button) => (
        <Button name={button} />
      ))}
    </div>
  );
};

export default ButtonList;
