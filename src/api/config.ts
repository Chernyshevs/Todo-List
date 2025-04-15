import axios from "axios";
import { tokenManager } from "../helpers/token-manager";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://easydev.club/api/v1",
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${tokenManager.accessToken}`;
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = { ...error.config };

    if (
      originalRequest.url?.includes("/auth/signin") ||
      originalRequest.url?.includes("/auth/signup")
    ) {
      return Promise.reject(error);
    }

    originalRequest._isRetry = true;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const prevRefreshToken = localStorage.getItem("refresh-token");
        const resp = await instance.post("/auth/refresh", {
          refreshToken: prevRefreshToken,
        });
        tokenManager.accessToken = resp.data.accessToken;
        tokenManager.refreshToken = resp.data.refreshToken;
        return instance.request(originalRequest);
      } catch (error) {
        console.error("Ошибка обновления токена:", error);

        tokenManager.accessToken = "";
        tokenManager.refreshToken = "";

        window.location.href = "/auth/login";

        return Promise.reject(error);
      }
    }

    throw error;
  }
);
