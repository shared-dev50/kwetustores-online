import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import type { Product } from "../entities/types";

const apiClient = new APIClient<Product>("/api/v1/products");

const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.getAll(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export default useGetAllProducts;
