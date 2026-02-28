/*
ChatArea.jsx functionality:
  - Container for all items [Dashboard container]

Last edited: 2/27/2026
*/

import { chatState } from '../state/state';
import Sidebar from './sidebar/Sidebar';
import ChatBox from './chat/ChatBox';
import Settings from './settings/Settings';

const ChatArea = () => {
  const { chats, createChat } = chatState();

  // Always have a chat created/open to go
  if (chats.length < 1) {
    createChat();
  }

  return (
    <div className="bg-zinc-900 h-dvh w-dvw flex flex-row justify-between items-center">
      <Sidebar />
      <Settings />
      <div className="h-dvh w-dvw absolute md:relative">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatArea;
