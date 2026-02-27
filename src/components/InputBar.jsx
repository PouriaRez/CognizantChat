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
      className="w-full md:w-1/2 p-3  flex justify-center items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full h-10 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-2xl p-2 "
        value={input ?? ''}
        onChange={(e) => setNewInput(chatId, e.target.value)}
        placeholder="Type here..."
        type="text"
      ></input>
      <div>
        <button
          type="submit"
          className="text-white hover:cursor-pointer bg-violet-600
hover:bg-violet-500 rounded-xl p-2"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default InputBar;
