
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsers } from '../api/api';

const useUserStore = create(
  persist(
    (set) => ({
      users: [],
      currentUser: null, 
      loading: false,
      page: 1,
      isAuthenticated: false,
      userToken: null,

      // Login Action
      loginSuccess: (token, userData) => set({ 
        isAuthenticated: true, 
        userToken: token,
        currentUser: userData 
      }),

      // Logout Action
      logout: () => set({ 
        isAuthenticated: false, 
        userToken: null, 
        users: [], 
        currentUser: null 
      }),

      updateCurrentUser: (updatedData) => set((state) => ({
        currentUser: { ...state.currentUser, ...updatedData },
        users: state.users.map((u) => 
          u.id === state.currentUser?.id ? { ...u, ...updatedData } : u
        )
      })),

      fetchUsers: async (pageNumber) => {
        set({ loading: true });
        try {
          const response = await getUsers(pageNumber);
          const newUsers = response.data.data;
          set((state) => ({
            users: pageNumber === 1 ? newUsers : [...state.users, ...newUsers],
            page: pageNumber,
            loading: false,
          }));
        } catch (error) {
          set({ loading: false });
          console.error("Fetch Error:", error);
        }
      },

      addUser: (user) => set((state) => ({ 
        users: [user, ...state.users] 
      })),

      updateUser: (updatedUser) => set((state) => ({
        users: state.users.map((u) => u.id === updatedUser.id ? updatedUser : u)
      })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;