import { chatState } from '../state/state';
import Sidebar from './Sidebar';
import TextBox from './TextBox';

const Chatbox = () => {
  // need to fix if AI doesn't send a response [test by removing .env var]
  const { chats } = chatState();
  return (
    <div className="bg-zinc-950 h-dvh w-dvw flex flex-row justify-between items-center">
      <Sidebar />
      <div className="h-dvh w-dvw absolute md:relative">
        {chats.length > 0 && <TextBox />}
      </div>
    </div>
  );
};

export default Chatbox;
