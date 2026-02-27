import { chatState } from '../state/state';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef, useState } from 'react';
import InputBar from './InputBar';
// current issue: When removing a chat, it removes the Active Chat ID also! need to fix, put it to top of page!
import { ToastContainer, toast } from 'react-toastify';

const TextBox = () => {
  const { chats, activeChatId, addMessage } = chatState();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState({ id: '', state: false });
  const API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;
  const API_URL = 'https://router.huggingface.co/v1/chat/completions';
  const bottomRef = useRef(null);
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages.length]);

  const callToast = () => {
    toast.error(`${err}`, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: 'dark',
    });
  };

  const handleSubmit = async (input) => {
    setErr('');
    if (!API_TOKEN) {
      setErr('AI token missing! Add your API token in the .env file.');
      setLoading({ id: activeChatId, state: false });
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

  const sendToLLM = async (updatedMessages) => {
    setErr('');
    setLoading({ id: activeChatId, state: true });
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
          max_tokens: 200,
          temperature: 0.5,
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
    setLoading({ id: activeChatId, state: false });
  };

  return (
    <div className=" h-full w-full flex flex-col justify-between items-center">
      <div className="w-full flex flex-col max-h-full overflow-y-auto leading-relaxed text-sm p-2 gap-2 text-zinc-100">
        <div className="flex justify-center items-center">
          {activeChat?.title}
        </div>

        {activeChat.messages.slice(1).map((msg, index) => {
          return msg.role === 'system' ? (
            <div
              key={index}
              className="w-full flex flex-col justify-start m-5 bg-zinc-800 rounded-xl p-2"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div key={index} className="w-full flex justify-end">
              <div className=" bg-indigo-600 rounded-xl p-2">{msg.content}</div>
            </div>
          );
        })}
        {loading.id === activeChatId && loading.state && (
          <div className="text-white">loading...</div>
        )}
        <div ref={bottomRef} />
      </div>
      {err && <ToastContainer pauseOnFocusLoss={false} />}
      {activeChat.messages.length < 2 && (
        <div className="text-center text-zinc-200">Start chatting!</div>
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
