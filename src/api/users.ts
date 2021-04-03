import { RepoType } from '../redux/user/types'
import { UserType } from '../redux/users/types'
import { request } from '../utils/fetch'

interface FetchSearchUsersInterface {
  page: number
  value: string
}

interface FetchUserInterface {
  page?: number
  name: string
}

export const UsersApi = {
  async fetchSearchUsers({
    page,
    value,
  }: FetchSearchUsersInterface): Promise<UserType[]> {
    const { payload } = await request<UserType[]>({
      url: 'search/users',
      params: {
        q: value,
        per_page: 50,
        page,
      },
    })
    return payload
  },

  async fetchUsers(page: number): Promise<UserType[]> {
    const { payload } = await request<UserType[]>({
      url: 'users',
      params: {
        since: page,
        per_page: 50,
      },
    })
    return payload
  },

  async fetchUser({ name }: FetchUserInterface): Promise<UserType> {
    const { payload } = await request<UserType>({
      url: `users/${name}`,
    })
    return payload
  },

  async fetchUserRepos({
    name,
    page,
  }: FetchUserInterface): Promise<RepoType[]> {
    const { payload } = await request<RepoType[]>({
      url: `users/${name}/repos`,
      params: {
        per_page: 50,
        page,
      },
    })
    return payload
  },
}
