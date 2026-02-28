/*
ChatTitle.jsx functionality:
  - Used to edit individual chat titles through the ChatList.jsx menu.
  - Initially updates chat title to first user sent message
Last edited: 2/27/2026
*/
import { useEffect } from 'react';
import { showError } from '../../utils/toast';
import { chatState } from '../../state/state';
const ChatTitle = ({
  chat,
  editingTitleId,
  newTitle,
  setNewTitle,
  setEditingTitleId,
}) => {
  const { setChatTitle } = chatState();

  // Checks for valid title change, if valid, updates that chats title field in state
  const handleChatTitleChange = (chatId) => {
    if (!newTitle || newTitle.trim().length < 1) {
      showError('Chat name must be >1 character');
      setEditingTitleId(null);
      return;
    }

    var splicedTitle = newTitle.slice(0, 12);
    if (newTitle.length > 12) {
      splicedTitle += '...';
    }

    setChatTitle(chatId, splicedTitle);
    setEditingTitleId(null);
  };

  // Trust the dependency array here, upon message update, set initial title
  useEffect(() => {
    if (
      chat.title === 'New Chat' &&
      chat.messages.length === 2 &&
      chat.messages[1].content
    ) {
      setChatTitle(chat.id, chat.messages[1].content.slice(0, 12));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.messages]);

  return (
    <div aria-label="sidebar-chat-title">
      {editingTitleId === chat.id && newTitle !== undefined ? (
        <div>
          <input
            className="w-full focus:outline-none focus:ring-0"
            value={newTitle}
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={() => handleChatTitleChange(chat.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
              if (e.key === 'Escape') {
                setNewTitle(chat.title);
                setEditingTitleId(null);
              }
            }}
            type="text"
          />
        </div>
      ) : (
        <div>{chat.title}</div>
      )}
    </div>
  );
};

export default ChatTitle;
