import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");

  const chatMessages = useSelector((store) => store.chat.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    const i = setInterval(() => {
      // API polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="hidden md:flex flex-col-reverse   w-10/12 h-[540px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll dark:bg-slate-600 dark:text-white  ">
        <div>
          {chatMessages.map((c, index) => (
            <ChatMessage key={index} name={c.name} message={c.message} />
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "pankij",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
        className="w-full p-2 ml-2  hidden md:flex"
      >
        <input
          className="px-6 py-2 -ml-2  w-64 border dark:bg-slate-700 rounded-l-full"
          type=" text"
          placeholder="enter your message"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        ></input>
        <button className="px-4  rounded-r-full  dark:bg-black border  ">
          Sent
        </button>
      </form>
    </>
  );
};

export default LiveChat;
