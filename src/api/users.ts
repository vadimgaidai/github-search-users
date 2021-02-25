import { UserType } from '../redux/users/types'
import { request, ResponseApi } from '../utils/fetch'

interface FetchSearchUsersInterface {
  page: number
  value: string
}

export const fetchSearchUsers = async ({
  page,
  value,
}: FetchSearchUsersInterface): Promise<UserType[]> => {
  const { payload }: ResponseApi = await request({
    url: 'search/users',
    params: {
      q: value,
      per_page: 50,
      page,
    },
  })
  return payload
}

export const fetchUsers = async (page: number): Promise<UserType[]> => {
  const { payload }: ResponseApi = await request({
    url: 'users',
    params: {
      per_page: 50,
      page,
    },
  })
  return payload
}

export const fetchUser = async (name: string): Promise<UserType> => {
  const { payload }: ResponseApi = await request({
    url: `users/${name}`,
  })
  return payload
}
