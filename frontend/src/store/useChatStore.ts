import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: null,
  onlineUsers: [],
  isMessagesLoading: null,

  getUsers: async () => {
    try {
      const res = await axiosInstance.get('/messages/users');
      set({ users: res.data });
    } catch (error) {
      console.log('Error caching users', error.message);
    }
  },
  getMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log('Error caching messages', error.message);
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log('Error sending messages', error.message);
    }
  },
  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { socketVal } = useAuthStore.getState();
    console.log("socketVal", socketVal)

    if (!socketVal) {
      console.log('Socket is not connected yet');
      return;
    }

    socketVal.on('newMessage', (newMessage) => {
      set({
        messages: [...get().messages, newMessage ],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const { socketVal } = useAuthStore.getState();

    // Ensure socket exists before trying to unsubscribe
    if (!socketVal) {
      console.log('Socket is not connected yet');
      return;
    }

    socketVal.off('newMessage'); // Make sure event name is 'newMessage'
  },

  setSelectedUser: (selectedUser) => {
    console.log(selectedUser);
    set({ selectedUser });
  },
}));

export default useChatStore;
