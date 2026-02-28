/*
InputBar.jsx functionality:
  - Input bar that is used in every chat for user input
  - Allows for one input at a time.
  - AI must respond before next input is allowed
  - Used in ChatBox.jsx

Last edited: 2/27/2026
*/

import { chatState } from '../../state/state';

const InputBar = ({ chatId, onSend, input }) => {
  const { setNewInput, typing } = chatState();

  // Handles user submit of prompt/input
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setNewInput(chatId, '');
  };

  return (
    <form
      className="w-full md:w-1/2 p-3  flex justify-center items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        aria-label="prompt-input-box"
        className="w-full h-10 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-2xl p-2 "
        value={input ?? ''}
        onChange={(e) => setNewInput(chatId, e.target.value)}
        placeholder="Type here..."
        type="text"
      />
      <div>
        <button
          aria-label="submit-prompt-button"
          type="submit"
          disabled={typing.state}
          className={`text-white hover:cursor-pointer bg-blue-800
                    hover:bg-blue-900 rounded-xl p-2
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-800
                    `}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default InputBar;
