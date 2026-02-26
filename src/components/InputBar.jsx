import React, { useState } from 'react';

const InputBar = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    console.log(input);
    onSend(input);
    setInput('');
  };

  return (
    <form
      className="w-1/2 p-3 flex justify-center items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full h-10 border border-white text-white rounded-2xl p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        type="text"
      ></input>
      <div>
        <button
          type="submit"
          className="text-white bg-gray-900 hover:cursor-pointer"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default InputBar;
