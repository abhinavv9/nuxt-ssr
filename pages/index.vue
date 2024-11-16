<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Blog Posts</h1>
    <div v-if="postStore.isLoading" class="text-center">Loading...</div>
    <div v-else-if="postStore.hasError" class="text-red-500 text-center">
      {{ postStore.error }}
    </div>
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="post in postStore.getPosts"
        :key="post.id"
        class="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.body.substring(0, 100) }}...</p>
        <NuxtLink
          :to="`/posts/${post.id}`"
          class="text-blue-600 hover:text-red-800"
        >
          Read more →
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "~/store/post.store";

const postStore = usePostStore();

// Fetch posts on component mount
await postStore.fetchPosts();

useHead({
  title: "Blog Posts | My Blog",
  meta: [
    {
      name: "description",
      content: "Read our latest blog posts about various topics",
    },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: "Blog Posts | My Blog" },
    {
      property: "og:description",
      content: "Read our latest blog posts about various topics",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>
