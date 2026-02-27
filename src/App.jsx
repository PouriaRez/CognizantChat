import Chatbox from './components/Chatbox';
import './App.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="h-dvh w-dvw">
      <ToastContainer />
      <Chatbox />
    </div>
  );
}

export default App;
