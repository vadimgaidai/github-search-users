/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid, CircularProgress } from '@material-ui/core'

import { selectRepos, selectUser } from '../redux/user/selectors'
import { UserActionsType } from '../redux/user/types'

import RepoCard from '../components/RepoCard'

interface UseParamsInterface {
  name: string
}
const User: FC = () => {
  const dispatch = useDispatch()
  const { name }: UseParamsInterface = useParams()
  const user = useSelector(selectUser)
  const repos = useSelector(selectRepos)

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch({
      type: UserActionsType.LOAD_USER,
      payload: {
        name,
        page,
      },
    })
  }, [dispatch, name])

  useEffect(() => {
    if (page > 1) {
      dispatch({
        type: UserActionsType.LOAD_USER_REPOS,
        payload: {
          name,
          page,
        },
      })
    }
  }, [dispatch, page])

  const onInfiniteLoadMoreRepos = (): void => {
    setPage((prevState) => prevState + 1)
  }

  const getDate = useCallback(() => {
    const date = new Date(user?.created_at || '')
    return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`
  }, [user])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img src={user?.avatar_url} alt={user?.name} />
        </Grid>
        <Grid item xs={6}>
          <h2>{user?.name}</h2>
          <p>Location: {user?.location}</p>
          <p>Join date: {getDate()}</p>
          <p>Followers: {user?.followers}</p>
          <p>Following: {user?.following}</p>
        </Grid>
        <Grid item xs={12}>
          <InfiniteScroll
            dataLength={repos.length}
            hasMore
            next={onInfiniteLoadMoreRepos}
            loader={<CircularProgress />}
          >
            {repos?.map(
              ({
                node_id: id,
                name: repoName,
                git_url: url,
                forks_count: forks,
                stargazers_count: stars,
              }) => (
                <RepoCard
                  key={id}
                  name={repoName}
                  url={url}
                  forks={forks}
                  stars={stars}
                />
              )
            )}
          </InfiniteScroll>
        </Grid>
      </Grid>
    </div>
  )
}

export default User
