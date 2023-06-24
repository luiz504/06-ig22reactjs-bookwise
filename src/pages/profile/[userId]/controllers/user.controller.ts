import { useQuery } from '@tanstack/react-query'

import { api } from '~/lib/axios'
import {
  GetUserActivityParams,
  GetUserActivityResponse,
} from '~/pages/api/user/get/activity.api'

export const useProfilePageUserController = ({
  userId,
}: {
  userId?: string
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['userActivity', { userId }],
    queryFn: async ({ signal }) => {
      if (!userId) return
      const params: GetUserActivityParams = { user_id: userId }
      const { data } = await api.get<GetUserActivityResponse>(
        '/user/get/activity',
        { params, signal },
      )
      return data
    },
    enabled: !!userId,
  })

  return { user: data, isLoadingUser: isLoading }
}
