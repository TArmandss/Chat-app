import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { formDataTypes } from '../pages/SignUpPage';
import { loginTypes } from '../pages/LogInPage';
import { io } from 'socket.io-client';

type AuthStore = {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  signup: (data: formDataTypes) => Promise<void>;
  login: (data: loginTypes) => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

const BASE_URL = 'http://localhost:5001';

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socketVal: null,
  onlineUsers: [],

  signup: async (data: formDataTypes) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Account created successfully');
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully');
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/checkAuth');
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  connectSocket: () => {
    const { authUser, socketVal, onlineUsers } = get();
    if (!authUser) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socketVal: socket });
    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const { socketVal } = get();

    // Ensure socket exists and is connected before disconnecting
    if (socketVal && socketVal.connected) {
      socketVal.disconnect();
      set({ socketVal: null }); // Clear the socket reference after disconnecting
    }
  },

  updateProfile: async (data) => {
    try {
      await axiosInstance.put('/auth/update-profile', data);
    } catch (error) {
      console.log('error in update profile:', error);
    }
  },
}));
