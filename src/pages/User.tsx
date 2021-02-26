/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Grid, Input } from '@material-ui/core'

import { selectRepos, selectUser } from '../redux/user/selectors'
import { RepoType, UserActionsType } from '../redux/user/types'

import RepoCard from '../components/RepoCard'
import Gallery from '../components/Gallery'
import { setUser } from '../redux/user'

interface UseParamsInterface {
  name: string
}
const User: FC = () => {
  const dispatch = useDispatch()
  const { name }: UseParamsInterface = useParams()
  const user = useSelector(selectUser)
  const repos = useSelector(selectRepos)

  const [page, setPage] = useState(1)
  const [searchResult, setSearchResult] = useState('')
  const [filteredRepos, setFilteredRepos] = useState<RepoType[]>([])

  useEffect((): (() => void) => {
    dispatch({
      type: UserActionsType.LOAD_USER,
      payload: {
        name,
        page,
      },
    })
    return () => dispatch(setUser({ user: null, repos: [] }))
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

  useEffect(() => {
    setFilteredRepos(
      searchResult
        ? repos?.filter((item) =>
            item?.name
              .toLocaleLowerCase()
              .match(searchResult.toLocaleLowerCase())
          )
        : repos
    )
  }, [repos, searchResult])

  const onLoadMoreRepos = (): void => {
    setPage((prevState) => prevState + 1)
  }

  const getDate = useCallback(() => {
    const date = new Date(user?.created_at || '')
    return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`
  }, [user])

  const onSearchRepo = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchResult(event.target.value)
  }

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
        <Input onChange={onSearchRepo} placeholder="Search repo" autoFocus />
        <Gallery dataLength={repos.length} onNext={onLoadMoreRepos}>
          {filteredRepos?.map(
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
        </Gallery>
      </Grid>
    </div>
  )
}

export default User
