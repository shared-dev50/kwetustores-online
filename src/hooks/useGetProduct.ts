import { useQuery } from "@tanstack/react-query";
import type { Product } from "../entities/types";
import APIClient from "../services/apiClient";
const apiClient = new APIClient<Product>("/api/v1/products");

const useProduct = (id: number | string) => {
  return useQuery({
    queryKey: ["products", id],

    queryFn: () => apiClient.getProduct(id),

    staleTime: 5 * 60 * 1000,
  });
};

export default useProduct;
