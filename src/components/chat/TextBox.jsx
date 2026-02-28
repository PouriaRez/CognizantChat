/*
TextBox.jsx functionality:
  - Displays all messages in the selected chat
  - Displays AI response in Markdown syntax
  - Used in ChatBox.jsx

Last edited: 2/27/2026
*/

import { chatState } from '../../state/state';
import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TypingBubble from './TypingBubble';
import { MdOutlineWavingHand } from 'react-icons/md';

const TextBox = () => {
  const { chats, activeChatId, typing } = chatState();
  const bottomRef = useRef(null);
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Scroll to bottom of messages upon receiving/sending message.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages.length]);

  return (
    <>
      <div
        className="flex justify-center items-center leading-relaxed text-sm p-2 gap-4 text-zinc-100
                    md:text-lg"
      >
        <div aria-label="chat-title" className="text-base md:text-lg p-2">
          {activeChat.title}
        </div>
      </div>
      <div
        className="w-full md:w-1/2 flex flex-col justify-start h-full max-h-full overflow-y-auto leading-relaxed text-sm p-2 gap-4 text-zinc-100
      md:text-lg"
      >
        {activeChat.messages.slice(1).map((msg, index) => {
          return msg.role === 'system' ? (
            <div
              key={index}
              className="prose prose-invert text-zinc-100 w-full flex flex-col justify-start bg-zinc-700 rounded-xl p-2"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div key={index} className="w-full flex justify-end">
              <div className="bg-blue-800 text-white rounded-xl p-2">
                {msg.content}
              </div>
            </div>
          );
        })}

        {typing.id === activeChatId && typing.state && (
          <div className="w-fit text-white bg-zinc-700 rounded-xl p-2">
            <TypingBubble />
          </div>
        )}

        {/* Anchors at bottom of message container to scroll on new message */}
        <div ref={bottomRef} />

        {activeChat.messages.length < 2 && (
          <div className="w-full h-full flex justify-center items-center gap-1 text-center text-zinc-400">
            Ask me anything
            <MdOutlineWavingHand aria-label="waving-hand" size={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default TextBox;
