/*
ChatBox.jsx functionality:
  - Container for the entire chat section
  - Responsible for sending user input to AI API route 
  - Created messages get added to storage here 

Last edited: 2/27/2026
*/

import { chatState } from '../../state/state';
import { useEffect } from 'react';
import InputBar from './InputBar';
import { showError } from '../../utils/toast';
import TextBox from './TextBox';

const ChatBox = () => {
  const API_TOKEN =
    import.meta.env.VITE_HF_API_TOKEN || localStorage.getItem('key');
  const API_URL = 'https://router.huggingface.co/v1/chat/completions';
  const { chats, activeChatId, addMessage, err, setErr, setTyping } =
    chatState();
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Display toast if an error occurs.
  useEffect(() => {
    if (!err) return;
    showError(err);
    setErr('');
  }, [err, setErr]);

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
        }),
      });
      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        showError(result.error || 'Something went wrong');
        setTyping({ id: activeChatId, state: false });
        return;
      }

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
    <div className="h-full w-full flex flex-col justify-between items-center ">
      <TextBox />
      <InputBar
        chatId={activeChat.id}
        onSend={handleSubmit}
        input={activeChat.input}
      />
    </div>
  );
};

export default ChatBox;
