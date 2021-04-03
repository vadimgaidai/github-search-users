/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce'
import { FC, ChangeEvent, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createStyles,
  makeStyles,
  Grid,
  Input,
  Avatar,
} from '@material-ui/core'

import { UsersActionsType } from '../redux/users/types'
import { setPage, setSearchValue } from '../redux/users'
import {
  selectUsers,
  selectIsUsersNeverLoading,
  selectIsUsersMoreLoading,
  selectPage,
  selectSearchValue,
  selectIsUsersLoadedError,
} from '../redux/users/selectors'

import Gallery from '../components/Gallery'
import Card from '../components/Card'

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      width: 70,
      height: 70,
      objectFit: 'cover',
    },
  })
)

const Users: FC = () => {
  const style = useStyles()
  const dispatch = useDispatch()

  const users = useSelector(selectUsers)
  const isMoreLoading = useSelector(selectIsUsersMoreLoading)
  const page = useSelector(selectPage)
  const searchValue = useSelector(selectSearchValue)
  const isUsersNeverLoading = useSelector(selectIsUsersNeverLoading)
  const isUsersErrorLoading = useSelector(selectIsUsersLoadedError)

  const [inputValue, setInputValue] = useState(searchValue)

  useEffect(() => {
    if (isUsersNeverLoading) {
      dispatch({
        type: UsersActionsType.LOAD_USERS,
      })
    }
  }, [dispatch])

  const sendQuery = (value: string) => {
    dispatch(setSearchValue(value))
    dispatch(setPage(1))
    if (value) {
      dispatch({
        type: UsersActionsType.LOAD_SEARCH_USERS,
        payload: {
          value,
          page: 1,
        },
      })
    } else {
      dispatch({
        type: UsersActionsType.LOAD_USERS,
      })
    }
  }

  const delayedInputValue = useRef(
    debounce((value: string): void => sendQuery(value), 500)
  ).current

  const onSearchUsers = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    delayedInputValue(event.target.value)
  }

  const onLoadMoreUsers = (): void => {
    if (searchValue) {
      const newPageNumber = page + 1
      dispatch(setPage(newPageNumber))
      dispatch({
        type: UsersActionsType.LOAD_SEARCH_USERS,
        payload: {
          value: searchValue,
          page: newPageNumber,
        },
      })
    } else {
      dispatch({
        type: UsersActionsType.LOAD_USERS,
        payload: users[users.length - 1]?.id + 1,
      })
    }
  }

  return (
    <>
      <Input
        disabled={users.length === 0}
        type="text"
        placeholder="Search users"
        value={inputValue}
        onChange={onSearchUsers}
      />
      <Grid container spacing={3}>
        <Gallery
          dataLength={users.length}
          isError={isUsersErrorLoading}
          isHasMore={isMoreLoading}
          onNext={onLoadMoreUsers}
        >
          {users?.map(({ node_id: id, avatar_url: avatar, login }) => (
            <Card key={id} to={`user/${login}`}>
              <Grid item xs={6}>
                <Avatar className={style.avatar} alt={login} src={avatar} />
              </Grid>
              <Grid container justify="flex-end">
                <h2>{login}</h2>
              </Grid>
            </Card>
          ))}
        </Gallery>
      </Grid>
    </>
  )
}

export default Users
