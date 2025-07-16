import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./generated";
import { CONFIG } from "@/shared/model/config";

export const fetchClient = createFetchClient<paths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);

fetchClient.use({
  async onRequest({ request }) {
    request.headers.set("X-API-KEY", CONFIG.X_API_KEY);
  },
});
