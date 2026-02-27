const TypingBubble = () => {
  return (
    <div className="flex gap-1.5">
      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.25s]" />
      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.5s]" />
    </div>
  );
};

export default TypingBubble;
