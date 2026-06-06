const { loadEnv } = require("vite");

const requiredVariables = [
  "VITE_API_BASE_URL",
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

const env = {
  ...loadEnv(process.env.NODE_ENV || "production", process.cwd(), ""),
  ...process.env,
};

const missingVariables = requiredVariables.filter((name) => !env[name]?.trim());

if (missingVariables.length) {
  console.error("Build failed: missing required environment variables:");
  missingVariables.forEach((name) => console.error(`  - ${name}`));
  console.error("Set these in Railway (or your local .env) before running npm run build.");
  process.exit(1);
}

const apiBaseUrl = env.VITE_API_BASE_URL.trim();

try {
  const parsed = new URL(apiBaseUrl);
  if (parsed.protocol !== "https:") {
    throw new Error("VITE_API_BASE_URL must use HTTPS.");
  }
} catch (error) {
  console.error(`Build failed: invalid VITE_API_BASE_URL (${apiBaseUrl})`);
  console.error(error.message);
  process.exit(1);
}

console.log("Build environment verified.");
