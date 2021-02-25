import { UserType } from '../redux/users/types'
import { request, ResponseApi } from '../utils/fetch'

export const fetchSearchUsers = async (value: string): Promise<UserType> => {
  const { payload }: ResponseApi = await request({
    url: `search/users?q=${value}`,
  })
  return payload
}
