import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
// import React from "react";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useSearchRestaurants(
  SearchState: SearchState,
  city?: string
) {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", SearchState.searchQuery);
    params.set("page", SearchState.page.toString());
    params.set("selectedCuisines", SearchState.selectedCuisines.join(","));
    // params.set("sortOption", SearchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?{params.toString()}}`
    );

    if (!response.ok) {
      throw new Error("Faied To get Restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants" , SearchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
}
