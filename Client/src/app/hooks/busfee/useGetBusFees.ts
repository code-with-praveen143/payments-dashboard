import { QueryClient, useQuery } from "@tanstack/react-query";

interface Bus{
  _id?: string;
  route: string;
  fee: number;
}
async function fetchBusFees(): Promise<Bus[]> {
    const auth_token = sessionStorage.getItem('auth_token')
    const response = await fetch('https://osaw.in/v1/payment/api/busRoutes', {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }
  
  export function useGetBusFees() {
    return useQuery<Bus[], Error>({
      queryKey: ['busFees'],
      queryFn: fetchBusFees,
      staleTime: 5 * 60 * 1000, 
    })
  }
  
  export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
      },
    },
  }) 