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
      <div className="flex flex-col-reverse   w-full h-[540px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll   ">
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
        className="w-full p-2 ml-2  border border-black flex"
      >
        <input
          className="px-2  w-96"
          type=" text"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        ></input>
        <button
          className="px-2 mx-2 bg-green-100  
         "
        >
          Sent
        </button>
      </form>
    </>
  );
};

export default LiveChat;
