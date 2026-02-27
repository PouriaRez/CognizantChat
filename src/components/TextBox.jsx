import { chatState } from '../state/state';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import InputBar from './InputBar';
import TypingBubble from './typingBubble';
import { showError } from '../utils/toast';
import { MdOutlineWavingHand } from 'react-icons/md';

const TextBox = () => {
  const API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;
  const API_URL = 'https://router.huggingface.co/v1/chat/completions';
  const { chats, activeChatId, addMessage, err, setErr, typing, setTyping } =
    chatState();
  const bottomRef = useRef(null);
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Scroll to bottom of messages upon receiving/sending message.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages.length]);

  // Display toast if an error occurs.
  useEffect(() => {
    if (!err) return;
    showError(err);
    setErr('');
  }, [err, setErr]);

  useEffect(() => {
    typing;
  }, [typing]);

  // Handles user input submission and sends to AI function
  const handleSubmit = async (input) => {
    setErr('');
    if (!API_TOKEN) {
      setErr('AI token missing! Add your API token in the .env file.');
      setTyping({ id: activeChatId, state: false });
      return;
    }
    try {
      addMessage(activeChatId, { role: 'user', content: input });
      const updatedMessages = [
        ...activeChat.messages,
        { role: 'user', content: input },
      ];

      await sendToLLM(updatedMessages);
    } catch (error) {
      setErr('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  // Handles input submission to the AI itself
  const sendToLLM = async (updatedMessages) => {
    setErr('');
    setTyping({ id: activeChatId, state: true });
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'zai-org/GLM-4.5',
          messages: updatedMessages,
          // max_tokens: 200,
          // temperature: 0.5,
        }),
      });
      const result = await res.json();

      const AiResponse = result.choices?.[0].message.content;

      if (!AiResponse) return;

      addMessage(activeChatId, { role: 'system', content: AiResponse });
    } catch (error) {
      setErr('Something went wrong. Please try again.');
      console.error(error);
    }
    setTyping({ id: activeChatId, state: false });
  };

  return (
    <div className=" h-full w-full flex flex-col justify-between items-center ">
      <div className="w-full flex flex-col max-h-full overflow-y-auto leading-relaxed text-sm md:text-base  p-2 gap-4 text-zinc-100">
        <div className="flex justify-center items-center p-2">
          {activeChat?.title}
        </div>

        {activeChat.messages.slice(1).map((msg, index) => {
          return msg.role === 'system' ? (
            <div
              key={index}
              className="w-fit flex flex-col justify-start bg-zinc-700 rounded-xl p-2"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div key={index} className="w-full flex justify-end">
              <div className="bg-violet-600/50 text-white rounded-xl p-2">
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

        <div ref={bottomRef} />
      </div>
      {activeChat.messages.length < 2 && (
        <div className="flex justify-center items-center gap-1 text-center text-zinc-400">
          Ask me anything
          <MdOutlineWavingHand size={20} />
        </div>
      )}
      <InputBar
        chatId={activeChat.id}
        onSend={handleSubmit}
        input={activeChat.input}
      />
    </div>
  );
};

export default TextBox;
