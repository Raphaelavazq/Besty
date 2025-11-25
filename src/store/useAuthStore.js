/**
 * Authentication Store
 * Manages user authentication state across the app
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      isGuest: false,

      // Sign in with credentials
      signIn: (userData) => {
        set({
          user: {
            id: userData.id || Date.now().toString(),
            email: userData.email,
            fullName: userData.fullName,
            bundesland: userData.bundesland,
            createdAt: userData.createdAt || new Date().toISOString(),
          },
          isAuthenticated: true,
          isGuest: false,
        });
      },

      // Continue as guest
      continueAsGuest: () => {
        set({
          user: {
            id: "guest",
            email: null,
            fullName: "Guest",
            isGuest: true,
          },
          isAuthenticated: false,
          isGuest: true,
        });
      },

      // Sign out
      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
          isGuest: false,
        });
      },

      // Update user profile
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...updates,
            },
          });
        }
      },

      // Check if user can save progress
      canSaveProgress: () => {
        const { isAuthenticated } = get();
        return isAuthenticated;
      },
    }),
    {
      name: "besty-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isGuest: state.isGuest,
      }),
    }
  )
);
