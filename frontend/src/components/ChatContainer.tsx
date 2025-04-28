import useChatStore from '../store/useChatStore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import ChatHeader from './ChatHeader.tsx';
import { useAuthStore } from '../store/useAuthStore.ts';
import MessageInput from './MessageInput.tsx';

export function Loading() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={70} sx={{ color: '#3A59D1' }} />
    </Box>
  );
}

function ChatContainer() {
  const {
    messages,
    getMessages,
    selectedUser,
    isMessagesLoading,
    listenToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    listenToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    listenToMessages,
    unsubscribeFromMessages,
  ]);

  function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  return (
    <div className="h-full min-h-0 w-full bg-[#0b0b0b] rounded-[.2rem]  flex flex-col items-center gap-10 justify-center">
      {isMessagesLoading ? (
        <Loading />
      ) : (
        <>
          <div className="h-full w-full flex-1 flex flex-col">
            <ChatHeader />
            <div className="h-full w-full flex-1 overflow-y-auto p-4 space-y-4">
              {' '}
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.senderId === authUser._id
                      ? 'justify-end'
                      : 'justify-start'
                  } `}
                >
                  <div className=" chat-image avatar flex rounded-[.2rem] gap-1.5">
                    <div className="size-10 rounded-full border">
                      <img
                        src={
                          message.senderId === authUser._id
                            ? authUser.profilePicture ||
                              'src/assets/sbcf-default-avatar.png'
                            : selectedUser.profilePicture ||
                              'src/assets/sbcf-default-avatar.png'
                        }
                        alt="profile pic"
                        className="rounded-[50%]"
                      />
                    </div>
                    <div>
                      <div className="chat-header mb-1">
                        <time className="text-xs opacity-50 ml-1 text-white">
                          {formatMessageTime(message.createdAt)}
                        </time>
                      </div>
                      <div className="chat-bubble flex flex-col">
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Attachment"
                            className="sm:max-w-[200px] rounded-md mb-2"
                          />
                        )}
                        {message.text && (
                          <p className="text-white p-3 bg-[#151515] rounded-[4rem] rounded-tl-none">
                            {' '}
                            {message.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatContainer;
