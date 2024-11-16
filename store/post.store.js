// stores/post.store.js
import { defineStore } from "pinia";
import { useApiCall } from "~/composables/useFetchApi";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    post: null,
    loading: false,
    error: null,
  }),

  getters: {
    getPosts: (state) => state.posts,
    getPost: (state) => state.post,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
  },

  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      const { data, error } = await useApiCall("/posts");

      if (error.value) {
        this.error = error.value;
        this.posts = [];
      } else {
        this.posts = data.value;
      }

      this.loading = false;
    },

    async fetchPostById(id) {
      this.loading = true;
      this.error = null;

      const { data, error } = await useApiCall(`/posts/${id}`);

      if (error.value) {
        this.error = error.value;
        this.post = null;
      } else {
        this.post = data.value;
      }

      this.loading = false;
    },

    clearPost() {
      this.post = null;
    },

    clearError() {
      this.error = null;
    },
  },
});
