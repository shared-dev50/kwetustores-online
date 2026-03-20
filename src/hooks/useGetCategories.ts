import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import type { CloverItem } from "../entities/types";

const apiClient = new APIClient<CloverItem>("/api/clover/categories");

const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getAll(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetCategories;
