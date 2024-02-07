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
    <div className="flex overflow-x-scroll">
      {buttonNameList.map((button) => (
        <Button name={button} />
      ))}
    </div>
  );
};

export default ButtonList;
