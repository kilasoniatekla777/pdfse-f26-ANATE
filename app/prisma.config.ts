import { defineConfig } from "prisma/config";

// Same pattern as IERI's apps/api/prisma.config.ts: the CLI reads DATABASE_URL from .env.local.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // Not present: fall back to the real environment (Vercel).
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL },
});
