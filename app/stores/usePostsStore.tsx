// stores/usePostsStore.ts
import { create } from "zustand";
import { getRecentPosts } from "../../sanity/lib/api";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  publishedAt: string | null;
  author: string;
  description: string;
  categories: string[];
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await getRecentPosts();
      set({ posts });
    } catch (err) {
      console.error("Error fetching posts:", err);
      // If it's a Sanity connection error, show a more helpful message
      if (err instanceof Error && err.message.includes("Request error")) {
        set({
          error:
            "Unable to connect to content management system. Please check your configuration.",
        });
      } else {
        set({ error: "Failed to load posts" });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
