import { useEffect } from 'react';
import useChatStore from '../store/useChatStore.js';
import { useAuthStore } from '../store/useAuthStore.js';

function SideBar() {
  const { getUsers, users, selectedUser, setSelectedUser,isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

    if (isUserLoading) return <div>Loading</div>;
  // if(!selectedUser) {
  //   return(
  //     <div>wait</div>
  //   )
  // }

  return (
    <div className="h-full w-full bg-[#0b0b0b] rounded-[.2rem] grid [grid-template-rows:auto_1fr] overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">Contacts ({users.length})</span>
          <span className="text-white text-sm">Online users ({onlineUsers.length - 1})</span>
        </div>
      </div>

      <div className="h-full w-full pl-2 pr-1 overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-[#1a1a1a]">
        {users.map((user) => (
          <div
            className="hover:bg-[#171717] cursor-pointer grid [grid-template-columns:auto_1fr] p-2 gap-3"
            key={user._id}
            onClick={() => setSelectedUser(user)}
          >
            <div className="w-fit flex justify-center items-center relative">
              <img
                className="w-12 h-12  rounded-full"
                src={
                  user.profilePicture || 'src/assets/sbcf-default-avatar.png'
                }
                alt={user.fullName}
              />
              { onlineUsers.includes(user._id) && (
                <div className="w-3 h-3 bg-[#0bf446] rounded-[50%] absolute bottom-0 right-1"></div>
              ) }
            </div>
            <div>
              <h1 className="text-white">{user.fullName}</h1>
              <p className="text-[grey] text-sm">
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
