import axios from "axios";

/**
 * API 요청을 위한 공통 Axios
 */
const TENANT_ID = "myyang";
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
