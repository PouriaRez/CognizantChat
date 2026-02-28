/*
Settings.jsx functionality:
  - Display a box allowing for user to enter in AI Secret [hashed] into localstorage

Last edited: 2/27/2026
*/

import { useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import { LuKeyRound } from 'react-icons/lu';
import Modal from '../Modal';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState('');

  // Sets key in state, closes modal and empties local input state
  const handleSaveKey = () => {
    localStorage.setItem('key', input);
    setIsModalOpen((prev) => !prev);
    setInput('');
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="fixed top-0 right-0 p-2 cursor-pointer z-999"
      >
        <CiSettings aria-label="settings-button" size={34} color="white" />
      </div>
      {isModalOpen && (
        <Modal
          onConfirm={() => {
            handleSaveKey();
          }}
          onClose={() => {
            setInput('');
            setIsModalOpen((prev) => !prev);
          }}
          leftBtn={{ text: 'Save', color: 'bg-blue-800' }}
          rightBtn={{ text: 'Cancel', color: 'bg-red-800' }}
          modalTitle={'Enter your HuggingFace Access Token:'}
          logo={{
            element: <LuKeyRound aria-label="key" size={50} color="white" />,
            bgColor: '',
          }}
        >
          {/* Sets User's key based on their input */}
          <input
            className="w-full h-10 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-2xl p-2 "
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Enter key..."
            type="text"
            aria-label="key-textbox"
          />
          <div className="font-bold text-xs text-red-500 p-2 ">
            Caution: key is not secure using this method.
          </div>
        </Modal>
      )}
    </>
  );
};

export default Settings;
