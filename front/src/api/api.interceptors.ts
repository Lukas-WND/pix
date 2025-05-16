import { api } from "./api.config";
import { toast } from "sonner";

api.interceptors.response.use(
  (respose) => respose,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("auth/refresh");

        if (response.status === 201) return api(originalRequest);

        throw new Error(response.data.message);
      } catch (refreshError: any) {
        toast.error(refreshError.message);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
