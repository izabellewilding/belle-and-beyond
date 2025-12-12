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
      // Sort posts by publishedAt descending (newest first) as a safety measure
      const sortedPosts = [...posts].sort((a, b) => {
        if (!a.publishedAt && !b.publishedAt) return 0;
        if (!a.publishedAt) return 1;
        if (!b.publishedAt) return -1;
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      });
      set({ posts: sortedPosts });
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
