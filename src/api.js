const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

if (!configuredApiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is required.");
}

const parsedApiBaseUrl = new URL(configuredApiBaseUrl);

if (parsedApiBaseUrl.protocol !== "https:") {
  throw new Error("VITE_API_BASE_URL must use HTTPS.");
}

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, "");
