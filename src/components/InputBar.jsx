// import { useState } from 'react';
import { chatState } from '../state/state';

const InputBar = ({ chatId, onSend, input }) => {
  const { setNewInput } = chatState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setNewInput(chatId, '');
  };

  return (
    <form
      className="w-full md:w-1/2 p-3 flex justify-center items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full h-10 border border-white text-white rounded-2xl p-2"
        value={input ?? ''}
        onChange={(e) => setNewInput(chatId, e.target.value)}
        placeholder="Type here..."
        type="text"
      ></input>
      <div>
        <button type="submit" className="text-white hover:cursor-pointer">
          Send
        </button>
      </div>
    </form>
  );
};

export default InputBar;
