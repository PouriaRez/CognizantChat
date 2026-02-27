import { useState } from 'react';
import { chatState } from '../state/state';
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarLeftCollapse,
} from 'react-icons/tb';
import { RiChatNewLine } from 'react-icons/ri';
import logo from '../assets/cog_logo.png';
import plainLogo from '../assets/plain_logo.png';

const Sidebar = () => {
  const { chats, activeChatId, createChat, removeChat, setActiveChat } =
    chatState();
  const [collapsed, setCollapsed] = useState(false);

  const handleCreateChat = () => {
    createChat();
  };

  const handleRemoveChat = (chatId) => {
    removeChat(chatId);
  };

  const handleSetActiveChat = (chatId) => {
    setActiveChat(chatId);
  };

  // const handleChatRename = (chatId, newTitle) => {
  //   if (newTitle.length < 3) return;
  //   setChatTitle(chatId, newTitle);
  // };

  // const handleDeleteAllChats = () => {};

  return (
    <div className={`${!collapsed ? 'w-full bg-black/50 md:w-fit' : ''} z-999`}>
      <div
        className={`h-dvh w-2/3 flex flex-col justify-start items-center gap-2 p-2 text-white
        md:bg-zinc-800 md:w-fit
        ${!collapsed && 'md:w-1/6 bg-zinc-800 '}
        `}
      >
        <div
          className={`w-full flex ${collapsed ? 'md:flex-col ' : ' flex-row'} justify-between items-center p-2 gap-5`}
        >
          <div className="hidden md:block">
            <img
              src={!collapsed ? logo : plainLogo}
              className={`${!collapsed ? 'w-40' : 'w-10'}`}
              alt="Cognizant"
            />
          </div>
          <button
            onClick={handleCreateChat}
            className={`
            md:block
            hover:cursor-pointer
            ${!collapsed ? 'block' : 'hidden'}
            `}
          >
            <RiChatNewLine size={24} />
          </button>
          <div
            onClick={() => setCollapsed((prev) => !prev)}
            className="cursor-pointer"
          >
            {!collapsed ? (
              <TbLayoutSidebarLeftCollapse size={24} />
            ) : (
              <TbLayoutSidebarRightCollapse size={24} />
            )}
          </div>
        </div>
        {!collapsed && (
          <div className="max-h-dvh w-full overflow-y-auto text-sm flex flex-col gap-2">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`cursor-pointer ${activeChatId === chat.id ? 'bg-violet-600' : ''} w-full flex justify-between items-center gap-2 p-2  rounded-xl 
              hover:bg-violet-800`}
                >
                  <div
                    className="w-full"
                    onClick={() => handleSetActiveChat(chat.id)}
                  >
                    {chat.title}
                  </div>
                  {/* Add a edit widget here to edit title. */}
                  {/* <div
                  onClick={() => handleChatRename(chat.id)}
                  className="bg-emerald-700"
                >
                  pencil
                </div> */}
                  <div
                    onClick={() => handleRemoveChat(chat.id)}
                    className="cursor-pointer"
                  >
                    X
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">Create a chat to start.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
