/*
App.jsx functionality:
  - Container for all components within the app
  - Allows for toast notifications/warnings throughout the entire app
  
Last edited: 2/27/2026
*/

import ChatArea from './components/ChatArea';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="h-dvh w-dvw">
      <ToastContainer />
      <ChatArea />
    </div>
  );
}

export default App;
