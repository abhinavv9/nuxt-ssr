<template>
  <div class="container mx-auto px-4 py-8">
    <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 mb-4 block">
      ← Back to Posts
    </NuxtLink>

    <div v-if="postStore.isLoading" class="text-center">Loading...</div>
    <div v-else-if="postStore.hasError" class="text-red-500 text-center">
      {{ postStore.error }}
    </div>
    <div v-else-if="postStore.getPost" class="max-w-2xl mx-auto">
      <article class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold mb-4">{{ postStore.getPost.title }}</h1>
        <p class="text-gray-700 leading-relaxed">
          {{ postStore.getPost.body }}
        </p>
      </article>
    </div>
    <div v-else class="text-center">
      <p>Post not found</p>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "../../store/post.store";

const route = useRoute();
const postStore = usePostStore();

// SSR-friendly data fetching
const { data } = await useAsyncData(
  `post-${route.params.id}`,
  async () => {
    await postStore.fetchPostById(route.params.id);
    return postStore.getPost;
  },
  {
    server: true,
    transform: (post) => post || null,
  }
);

// SSR-compatible head meta
useHead({
  title: computed(() =>
    data.value?.title ? `${data.value.title} | My Blog` : "Post Not Found"
  ),
  meta: computed(() => [
    {
      name: "description",
      content: data.value?.body
        ? data.value.body.substring(0, 160)
        : "Post not found",
    },
    { name: "robots", content: "index, follow" },
    {
      property: "og:title",
      content: data.value?.title || "Post Not Found",
    },
    {
      property: "og:description",
      content: data.value?.body
        ? data.value.body.substring(0, 160)
        : "Post not found",
    },
    { property: "og:type", content: "article" },
  ]),
});

// Cleanup
onUnmounted(() => {
  postStore.clearPost();
});
</script>
