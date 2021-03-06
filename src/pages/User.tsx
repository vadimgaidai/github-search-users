/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
  createStyles,
  makeStyles,
  Input,
  Avatar,
  Typography,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import {
  selectRepos,
  selectUser,
  selectIsUserLoading,
  selectIsUserMoreLoading,
} from '../redux/user/selectors'
import { RepoType, UserActionsType } from '../redux/user/types'

import RepoCard from '../components/RepoCard'
import Gallery from '../components/Gallery'

interface UseParamsInterface {
  name: string
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr));',
      columnGap: 30,
      rowGap: 30,
    },
    avatar: {
      alignSelf: 'center',
      justifySelf: 'center',
      width: 200,
      height: 200,
      objectFit: 'cover',
    },
    typography: {
      display: 'grid',
      alignSelf: 'center',
      justifySelf: 'center',
      rowGap: 10,
    },
    title: {
      fontSize: 25,
      margin: 0,
    },
    text: {
      fontSize: 18,
      margin: 0,
    },
  })
)

const User: FC = () => {
  const style = useStyles()
  const dispatch = useDispatch()
  const { name }: UseParamsInterface = useParams()

  const user = useSelector(selectUser)
  const repos = useSelector(selectRepos)
  const isUserLoading = useSelector(selectIsUserLoading)
  const isMoreLoading = useSelector(selectIsUserMoreLoading)

  const [page, setPage] = useState(1)
  const [searchResult, setSearchResult] = useState('')
  const [filteredRepos, setFilteredRepos] = useState<RepoType[]>([])

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

  const getDate = useCallback(
    (userDate) => {
      const date = new Date(userDate)
      return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`
    },
    [user]
  )

  const onSearchRepo = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchResult(event.target.value)
  }

  return (
    <>
      <div className={style.card}>
        {isUserLoading ? (
          <Avatar
            className={style.avatar}
            src={user?.avatar_url}
            alt={user?.name}
          />
        ) : (
          <Skeleton
            className={style.avatar}
            animation="wave"
            variant="circle"
          />
        )}
        <Typography className={style.typography} component="div">
          {isUserLoading ? (
            <h2 className={style.title}>{user?.name ?? 'User name'}</h2>
          ) : (
            <Skeleton animation="wave" variant="text" width={200} />
          )}
          {isUserLoading ? (
            <p className={style.text}>
              Location: {user?.location ?? 'No location'}
            </p>
          ) : (
            <Skeleton animation="wave" variant="text" width={100} />
          )}
          {isUserLoading ? (
            <p className={style.text}>
              Join date:{' '}
              {user?.created_at ? getDate(user?.created_at) : 'No join date'}
            </p>
          ) : (
            <Skeleton animation="wave" variant="text" width={100} />
          )}
          {isUserLoading ? (
            <p className={style.text}>
              Followers: {user?.followers ?? 'No followers'}
            </p>
          ) : (
            <Skeleton animation="wave" variant="text" width={100} />
          )}
          {isUserLoading ? (
            <p className={style.text}>
              Following: {user?.following ?? 'No following'}
            </p>
          ) : (
            <Skeleton animation="wave" variant="text" width={100} />
          )}
        </Typography>
      </div>
      <Input
        disabled={!isUserLoading}
        type="text"
        placeholder="Search repo"
        onChange={onSearchRepo}
      />
      <Gallery
        dataLength={repos.length}
        isHasMore={isMoreLoading}
        onNext={onLoadMoreRepos}
      >
        {filteredRepos?.map(
          ({
            node_id: id,
            name: repoName,
            git_url: url,
            forks_count: forks,
            stargazers_count: stars,
          }) =>
            isUserLoading ? (
              <RepoCard
                key={id}
                name={repoName}
                url={url}
                forks={forks}
                stars={stars}
              />
            ) : (
              <Skeleton
                key={id}
                animation="wave"
                variant="text"
                width="100%"
                height={100}
              />
            )
        )}
      </Gallery>
    </>
  )
}

export default User
