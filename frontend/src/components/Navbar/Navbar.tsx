import { AiOutlineMessage } from 'react-icons/ai';

function Navbar() {
  return (
    <div>
      <nav className="bg-black w-full p-5 flex items-center gap-1.5">
        <div className="logo text-white text-xl p-2 bg-[#3A59D1] flex items-center justify-center rounded-[.2rem]">
          <AiOutlineMessage />
        </div>

        <h1 className="text-white">Chatty.app</h1>
      </nav>
    </div>
  );
}

export default Navbar;
