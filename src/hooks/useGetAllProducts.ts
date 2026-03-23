import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import APIClient from "../services/apiClient";
import type { CloverItem } from "../entities/types";

const apiClient = new APIClient<CloverItem>("/api/clover/inventory");

const useGetAllProducts = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.trim() || undefined;
  const category = searchParams.get("category") || undefined;

  return useQuery({
    queryKey: ["products", { search, category }],

    queryFn: () =>
      apiClient.getAll({
        params: {
          ...(search && { search }),
          ...(category && { category }),
        },
      }),

    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};

export default useGetAllProducts;
