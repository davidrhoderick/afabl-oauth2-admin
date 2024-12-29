import { defineConfig } from "orval";

export default defineConfig({
  clients: {
    input: "https://api.oauthabl.com/openapi",
    output: {
      mode: "tags-split",
      target: "./app/generated/endpoints",
      schemas: "./app/generated/models",
      client: "react-query",
      mock: true,
      baseUrl: "https://api.oauthabl.com",
    },
  },
  clientsZod: {
    input: "https://api.oauthabl.com/openapi",
    output: {
      mode: "tags-split",
      mock: true,
      baseUrl: "https://api.oauthabl.com",
      client: "zod",
      target: "./app/generated/endpoints",
      fileExtension: ".zod.ts",
    },
  },
});
