import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { MdArrowBack } from "react-icons/md";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    console.log("hi");
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  console.log(selectedConversation);
  return (
    <div
      className={`${
        selectedConversation ? "w-full" : "max-sm:hidden"
      }min-w-[0px] md:min-w-[450px] flex flex-col`}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 text-left flex">
            <MdArrowBack
              className="md:hidden text-2xl font-bold"
              onClick={() => setSelectedConversation(null)}/>
            <div>
              <span className="label-text">To:</span>
              <span className="text-gray-900 font-bold">
                {selectedConversation.fullName}
              </span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName}🖐🏻 </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
