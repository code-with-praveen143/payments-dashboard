import { useQuery, QueryClient } from '@tanstack/react-query'

export type UserRole = 'admin' | 'accountant'

export interface User {
  role: ReactNode
  _id?: string
  serialNo: string
  staffCode: string
  name: string
  email: string
  type: UserRole
}

async function fetchUsers(): Promise<User[]> {
  const auth_token = sessionStorage.getItem('auth_token')
  const response = await fetch('https://osaw.in/v1/payment/api/users', {
    headers: {
      Authorization: `Bearer ${auth_token}`
    }
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export function useGetUsers() {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
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

