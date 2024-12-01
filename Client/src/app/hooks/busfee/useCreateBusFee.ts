// utils/busFeeAPI.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BusFee {
  _id?: string;
  route: string;
  fee: number;
}

// Replace with your actual API endpoint
const API_URL = "https://osaw.in/v1/payment/api/busRoutes";

export const useAddBusFee = () => {
  const queryClient = useQueryClient();
  const authToken = sessionStorage.getItem("auth_token");

  return useMutation({
    mutationFn: async (newBusFee: Omit<BusFee, "_id">) => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newBusFee),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["busFees"] });
    },
  });
};
