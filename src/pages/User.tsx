/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import {
  createStyles,
  makeStyles,
  Input,
  Avatar,
  Typography,
  Grid,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import {
  selectRepos,
  selectUser,
  selectIsUserLoading,
  selectIsUserMoreLoading,
  selectIsUserLoadedError,
} from '../redux/user/selectors'
import { RepoType, UserActionsType } from '../redux/user/types'

import Gallery from '../components/Gallery'
import Card from '../components/Card'

interface UseParamsInterface {
  name: string
}

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      textDecoration: 'none',
      marginBottom: 30,
      color: '#fff',
      columnGap: 10,

      '& svg': {
        transition: 'all 0.1s ease-in',
      },

      '&:hover': {
        '& svg': {
          transform: 'translateX(-5px)',
        },
      },
    },
    linkText: {
      alignSelf: 'center',
    },
    info: {
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
      fontSize: 16,
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
  const isUserErrorLoading = useSelector(selectIsUserLoadedError)

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
      <NavLink className={style.link} to="/">
        <ArrowBackIcon />
        <span className={style.linkText}>Back to users page</span>
      </NavLink>
      <div className={style.info}>
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
        isError={isUserErrorLoading}
        isHasMore={!searchResult && isMoreLoading}
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
              <Card
                key={id}
                href={url.replace('git:', 'https:')}
                target="_blank"
              >
                <Grid item xs={9}>
                  <h2>{repoName}</h2>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={style.typography}
                    component="div"
                    align="right"
                  >
                    <p className={style.text}>Forks: {forks}</p>
                    <p className={style.text}>Stars: {stars}</p>
                  </Typography>
                </Grid>
              </Card>
            ) : (
              <Skeleton
                key={id}
                animation="wave"
                variant="text"
                width="100%"
                height={90}
              />
            )
        )}
      </Gallery>
    </>
  )
}

export default User
