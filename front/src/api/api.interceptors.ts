import { api } from "./api.config";
import { toast } from "sonner";

// Evita loop de logout recursivo
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se a resposta foi 401 e ainda não tentamos refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post("/auth/refresh");

        isRefreshing = false;
        processQueue(null);

        console.log('refreshou')
        return api(originalRequest);
      } catch (refreshError: any) {
        isRefreshing = false;
        processQueue(refreshError);

        // Evita loop chamando logout -> 401 de novo
        if (!originalRequest.url.includes("/auth/logout")) {
          try {
            await fetch("/auth/logout", { method: "DELETE", credentials: "include" });
          } catch (e) {
            console.error("Erro ao deslogar após falha no refresh:", e);
          }
        }

        toast.error("Sessão expirada. Faça login novamente.");
        window.location.href = "/signin";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
