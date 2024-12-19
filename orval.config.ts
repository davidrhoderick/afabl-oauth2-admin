import { defineConfig } from "orval";

export default defineConfig({
  clients: {
    input: "https://hono-oath2-admin-api.david-e-rhoderick.workers.dev/openapi",
    output: {
      mode: "tags-split",
      target: "./app/generated/endpoints",
      schemas: "./app/generated/models",
      client: "react-query",
      mock: true,
      baseUrl: "https://hono-oath2-admin-api.david-e-rhoderick.workers.dev",
    },
  },
  clientsZod: {
    input: "https://hono-oath2-admin-api.david-e-rhoderick.workers.dev/openapi",
    output: {
      mode: "tags-split",
      mock: true,
      baseUrl: "https://hono-oath2-admin-api.david-e-rhoderick.workers.dev",
      client: "zod",
      target: "./app/generated/endpoints",
      fileExtension: ".zod.ts",
    },
  },
});
