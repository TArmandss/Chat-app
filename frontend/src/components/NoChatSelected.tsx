import { AiOutlineMessage } from 'react-icons/ai';

function NoChatSelected() {
  return (
    <div className="h-[100%] w-full bg-[#0b0b0b] rounded-[.2rem]  flex flex-col items-center gap-3 justify-center">
      <div className="logo text-white text-xl p-2 bg-[#3A59D1] flex items-center justify-center rounded-[.2rem] animate-bounce">
        {' '}
        <AiOutlineMessage />
      </div>
      <h1 className="text-white text-2xl">Welcome to chat</h1>
      <p className="text-white text-sm">
        Pick a conversation from the sidebar to start the chat
      </p>
    </div>
  );
}

export default NoChatSelected;
