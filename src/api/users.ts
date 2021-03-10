import { RepoType } from '../redux/user/types'
import { UserType } from '../redux/users/types'
import { request, ResponseApi } from '../utils/fetch'

interface FetchSearchUsersInterface {
  page: number
  value: string
}

interface FetchUserInterface {
  page?: number
  name: string
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
      since: page,
      per_page: 50,
    },
  })
  return payload
}

export const fetchUser = async ({
  name,
}: FetchUserInterface): Promise<UserType> => {
  const { payload }: ResponseApi = await request({
    url: `users/${name}`,
  })
  return payload
}

export const fetchUserRepos = async ({
  name,
  page,
}: FetchUserInterface): Promise<RepoType[]> => {
  const { payload }: ResponseApi = await request({
    url: `users/${name}/repos`,
    params: {
      per_page: 50,
      page,
    },
  })
  return payload
}
