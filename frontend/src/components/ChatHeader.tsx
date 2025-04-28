import { useAuthStore } from '../store/useAuthStore';
import useChatStore from '../store/useChatStore';
import { IoIosClose } from 'react-icons/io';

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="w-full h-fit p-2.5 border-b border-[#171717] relative">
      <div className="grid grid-cols-2">
        <div className="grid [grid-template-columns:auto_1fr] p-2 gap-3">
          <div className="w-fit flex justify-center items-center relative">
            <img
              className="w-12 h-12  rounded-full"
              src={
                selectedUser.profilePicture ||
                'src/assets/sbcf-default-avatar.png'
              }
              alt={selectedUser.fullName}
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className="w-3 h-3 bg-[#0bf446] rounded-[50%] absolute bottom-0 right-1"></div>
            ) }
          </div>
          <div>
            <h1 className="text-white text-md">{selectedUser.fullName}</h1>
            <p className="text-white text-xs">
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end">
          <IoIosClose
            className="text-white text-2xl cursor-pointer"
            onClick={() => setSelectedUser(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
