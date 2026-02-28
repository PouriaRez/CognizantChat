/*
TypingBubble.jsx functionality:
  - Loading animation for when AI is generating response 
  - Used in TextBox.jsx
  
Last edited: 2/27/2026
*/

const TypingBubble = () => {
  return (
    <div aria-label="chat-replying-bubble" className="flex gap-1.5">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.25s]" />
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.5s]" />
    </div>
  );
};

export default TypingBubble;
