import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // Bookmarked content IDs
      bookmarks: [],
      toggleBookmark: (contentId) => {
        const bookmarks = get().bookmarks;
        if (bookmarks.includes(contentId)) {
          set({ bookmarks: bookmarks.filter((id) => id !== contentId) });
        } else {
          set({ bookmarks: [...bookmarks, contentId] });
        }
      },
      isBookmarked: (contentId) => get().bookmarks.includes(contentId),

      // Recently viewed content IDs (max 20)
      recentlyViewed: [],
      addToRecent: (contentId) => {
        const recent = get().recentlyViewed.filter((id) => id !== contentId);
        set({ recentlyViewed: [contentId, ...recent].slice(0, 20) });
      },

      // Collections/folders (future feature)
      collections: {},

      // User preferences
      preferences: {
        theme: "light",
        language: "de",
      },

      // Theme actions
      toggleTheme: () => {
        const current = get().preferences.theme;
        set({
          preferences: {
            ...get().preferences,
            theme: current === "light" ? "dark" : "light",
          },
        });
      },

      setTheme: (theme) => {
        set({
          preferences: {
            ...get().preferences,
            theme,
          },
        });
      },
    }),
    {
      name: "b1-bestie-storage",
      version: 1,
    }
  )
);
