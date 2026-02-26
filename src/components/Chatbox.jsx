import React, { useEffect, useState } from 'react';
import InputBar from './InputBar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const Chatbox = () => {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('messages');
    if (stored) {
      return JSON.parse(stored);
    }

    return [
      {
        role: 'system',
        content: `You are here to help the user with anything they ask for within reason.
          Respond using Markdown. Assume that you are returning to a dark background.
          Use headings, lists, code blocks, and emphasis where appropriate.`,
      },
    ];
  });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;
  const API_URL = 'https://router.huggingface.co/v1/chat/completions';

  const sendToLLM = async (updatedMessages) => {
    setErr('');
    setLoading(true);
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
        }),
      });

      const result = await res.json();

      const AiResponse = result.choices?.[0].message.content;

      setMessages((prev) => [...prev, { role: 'system', content: AiResponse }]);
    } catch (error) {
      setErr(error);
    }
    setLoading(false);
  };
  const handleSubmit = async (input) => {
    setErr('');
    try {
      setMessages((prev) => [...prev, { role: 'user', content: input }]);
      const updatedMessages = [...messages, { role: 'user', content: input }];
      await sendToLLM(updatedMessages);
    } catch (error) {
      setErr(error);
    }
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const displayMessages = () => {
    return (
      <div className="flex flex-col max-h-full w-3/4 overflow-y-auto ">
        {messages.slice(1).map((msg) => {
          return msg.role === 'system' ? (
            <div
              key={msg.content}
              className="w-1/2 flex flex-col justify-start m-5 text-white"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div
              key={msg.content}
              className="w-full flex justify-end text-white"
            >
              {msg.content}
            </div>
          );
        })}
        {loading && <div className="text-white">loading...</div>}
      </div>
    );
  };

  return (
    <div className="bg-[#121212] h-dvh w-dvw flex flex-col justify-between items-center">
      {err && <div>{err}</div>}
      {displayMessages()}
      <InputBar onSend={handleSubmit} />
    </div>
  );
};

export default Chatbox;
