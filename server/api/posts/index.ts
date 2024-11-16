import { defineEventHandler, setHeader } from "h3";

export default defineEventHandler(async (event) => {
  setHeaders(event, {
    "Cache-Control": `max-age=3600, s-maxage=3600, stale-while-revalidate=86400`,
    "Content-Type": "application/json",
  });

  return await $fetch("https://jsonplaceholder.typicode.com/posts");
});
