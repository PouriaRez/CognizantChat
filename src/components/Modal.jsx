/*
Modal.jsx functionality:
  - Create a reusable destructive modal
  - Used to delete chats in Sidebar.jsx
  - Used as settings modal in Settings.jsx

Last edited: 2/27/2026
*/

const Modal = ({
  onConfirm,
  onClose,
  text,
  leftBtn,
  rightBtn,
  modalTitle,
  logo,
  children,
}) => {
  return (
    <div
      aria-label="modal"
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 "
    >
      <div
        className="p-2 min-h-fit rounded-2xl flex flex-col justify-between items-center gap-2 text-zinc-100 leading-relaxed bg-zinc-800/50 backdrop-blur-sm 
                    md:w-1/4 md:h-1/4"
      >
        <div className={`${logo?.bgColor} rounded-4xl p-2`}>{logo.element}</div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="font-bold">{modalTitle}</div>
          <div className="font-bold underline">{text}</div>
        </div>
        <div>{children}</div>
        <div className="w-full flex justify-between items-center gap-2">
          <div
            onClick={onConfirm}
            className={`cursor-pointer text-center font-bold ${leftBtn.color} rounded-xl p-2 w-full`}
          >
            {leftBtn?.text}
          </div>
          <div
            onClick={onClose}
            className={`cursor-pointer text-center font-bold ${rightBtn.color} rounded-xl p-2 w-full`}
          >
            {rightBtn?.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
