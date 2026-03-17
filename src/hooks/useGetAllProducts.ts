import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import type { CloverItem } from "../entities/types";

const apiClient = new APIClient<CloverItem>("/api/clover/inventory");

const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.getAll(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export default useGetAllProducts;
