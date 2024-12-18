import { defineConfig } from "orval";

export default defineConfig({
  clientsApi: {
    input:
      "https://hono-oath2-admin-api.david-e-rhoderick.workers.dev/clients-doc",
    output: {
      target: "./app/clients-api.ts",
      client: "react-query",
      mock: true,
      baseUrl: "https://hono-oath2-admin-api.david-e-rhoderick.workers.dev",
    },
  },
});
