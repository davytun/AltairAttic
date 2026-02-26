import axios from "axios";

const DEFAULT_PROD_API_BASE_URL = "https://demo.altairattic.net/altair-attic/api/public";
const envApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();
const envIsLocalhost = /localhost|127\.0\.0\.1/i.test(envApiBaseUrl);

const resolvedBaseUrl =
  import.meta.env.PROD && (!envApiBaseUrl || envIsLocalhost)
    ? DEFAULT_PROD_API_BASE_URL
    : envApiBaseUrl || DEFAULT_PROD_API_BASE_URL;

const apiClient = axios.create({
  baseURL: resolvedBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
