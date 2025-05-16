import { api } from "./api.config";
import { toast } from "sonner";

api.interceptors.response.use(
  (respose) => respose,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('refresh')
        const response = await api.post("auth/refresh");

        if (response.status === 201) return api(originalRequest);

        throw new Error(response.data.message);
      } catch (refreshError: any) {
        toast.error(refreshError.message);
        console.log('erro')
        await api.delete("auth/logout");

        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);
