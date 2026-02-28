/*
ChatList.jsx functionality:
  - List of all chats in memory
  - Is used within Sidebar.jsx

Last edited: 2/27/2026
*/

import { chatState } from '../../state/state';
import { GoPencil } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';
import ChatTitle from './ChatTitle';

const ChatList = ({
  collapsed,
  editingTitleId,
  setEditingTitleId,
  newTitle,
  setNewTitle,
  setIsModalOpen,
  setDeleting,
}) => {
  const { chats, activeChatId, setActiveChat } = chatState();

  // Updates activeChatId state on new chat selection
  const handleSetActiveChat = (chatId) => {
    setActiveChat(chatId);
  };

  // Allows for the start of chat title change flow
  const handleEditTitle = (chatId, currTitle) => {
    setNewTitle(currTitle);
    setEditingTitleId(chatId);
  };

  // Handles identifying the chat being deleted and opening modal
  const handleRemoveChat = (chatId, title) => {
    setIsModalOpen(true);
    setDeleting({ id: chatId, title: title });
  };
  return (
    <div
      className={`${collapsed ? 'hidden' : 'block'} max-h-dvh w-full overflow-y-auto text-sm flex flex-col gap-2`}
    >
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.id}
            className={`cursor-pointer ${activeChatId === chat.id ? 'bg-blue-700' : ''} w-full flex justify-between items-center gap-2 p-2 rounded-xl 
                              hover:bg-blue-900
                                transition-colors duration-100`}
          >
            <div
              className="w-full"
              onClick={() => handleSetActiveChat(chat.id)}
            >
              <ChatTitle
                chat={chat}
                editingTitleId={editingTitleId}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                setEditingTitleId={setEditingTitleId}
              />
            </div>
            <div
              aria-label="edit-chat-title-button"
              onClick={() => handleEditTitle(chat.id, chat.title)}
              className="cursor-pointer hover:scale-120 transition-all duration-250"
            >
              <GoPencil />
            </div>
            <div
              aria-label="delete-chat-button"
              onClick={() => handleRemoveChat(chat.id, chat.title)}
              className="cursor-pointer hover:scale-120 transition-all duration-250"
            >
              <RxCross1 />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">Create a chat to start.</div>
      )}
    </div>
  );
};

export default ChatList;
