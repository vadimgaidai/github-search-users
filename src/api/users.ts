import { UserType } from '../redux/users/types'
import { request, ResponseApi } from '../utils/fetch'

export const fetchSearchUsers = async (value: string): Promise<UserType> => {
  const { payload }: ResponseApi = await request({
    url: `search/users?q=${value}`,
  })
  return payload
}

export const fetchUser = async (name: string): Promise<UserType> => {
  const { payload }: ResponseApi = await request({
    url: `users/${name}`,
  })
  return payload
}
