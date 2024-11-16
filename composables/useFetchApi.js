// composables/useFetchApi.js
import { useFetch } from "#app";

export function useFetchApi(url, options = {}) {
  const BASE_URL = "https://jsonplaceholder.typicode.com";

  const defaults = {
    baseURL: BASE_URL,
    key: typeof url === "string" ? url : JSON.stringify(url),
    server: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // Merge options using native spread operator
  const fetchOptions = {
    ...defaults,
    ...options,
    // Deep merge headers
    headers: {
      ...defaults.headers,
      ...options.headers,
    },
  };

  return useFetch(url, fetchOptions);
}

export async function useApiCall(endpoint, opts = {}) {
  return await useFetchApi(endpoint, {
    ...opts,
    transform: (response) => {
      if (!response) return null;
      return response;
    },
    onResponseError({ response }) {
      return {
        error: new Error(response?.statusText || "API Error"),
        data: null,
      };
    },
  });
}
