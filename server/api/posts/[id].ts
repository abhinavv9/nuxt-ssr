import { defineEventHandler, setHeaders } from "h3";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  try {
    setHeaders(event, {
      "Cache-Control": `max-age=3600, s-maxage=3600, stale-while-revalidate=86400`,
      "Content-Type": "application/json",
    });

    const post = await $fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return post;
  } catch (error) {
    setHeaders(event, {
      "Cache-Control": "no-cache",
    });
    throw createError({
      statusCode: 404,
      message: `Post ${id} not found`,
    });
  }
});
