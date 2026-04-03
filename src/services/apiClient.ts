import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

class APIClient<T> {
  endpoint: string;
  private axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
  }

  getAll = async (config?: AxiosRequestConfig): Promise<T[]> => {
    try {
      const res = await this.axiosInstance.get<ApiResponse<T[]>>(
        this.endpoint,
        config,
      );

      // console.log(`Fetch successful for ${this.endpoint}:`, res.data);

      return res.data.data;
    } catch (error) {
      console.error(`Fetch error at ${this.endpoint}:`, error);
      throw new Error(`Failed to fetch from ${this.endpoint}`);
    }
  };

  getProduct = async (
    id: number | string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    try {
      const res = await this.axiosInstance.get<T>(
        `${this.endpoint}/${id}`,
        config,
      );
      return res.data;
    } catch {
      throw new Error("Failed to fetch product");
    }
  };

  addProduct = async (data: T): Promise<T> => {
    try {
      const res = await this.axiosInstance.post<ApiResponse<T>>(
        this.endpoint,
        data,
      );
      return res.data.data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to post data";
      throw new Error(message);
    }
  };
  post = async <D, R>(data: D): Promise<R> => {
    const res = await this.axiosInstance.post<R>(this.endpoint, data);
    return res.data;
  };
}

export default APIClient;
