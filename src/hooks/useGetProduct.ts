import { keepPreviousData, useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import type { CloverItem, ApiResponse } from "../entities/types";

const apiClient = new APIClient<ApiResponse<CloverItem>>(
  "/api/clover/inventory",
);

const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => apiClient.getProduct(id),
    select: response => response.data,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

export default useProduct;
