import React from 'react'
import SearchInput from './SearchInput'
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useConversation from '../../zustand/useConversation';


const Sidebar = () => {
  const { selectedConversation} = useConversation();
  return (
    <>
      <div
        className={`border-r border-slate-500 p-7 flex flex-col ${
          selectedConversation ? "max-sm:hidden" : " w-full"
        }`}
      >
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogoutButton />
      </div>
    </>
  );
}

export default Sidebar