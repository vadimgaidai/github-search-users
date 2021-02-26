/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ChangeEvent, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Input } from '@material-ui/core'
import debounce from 'lodash.debounce'

import { UsersActionsType } from '../redux/users/types'
import { selectIsUsersMoreLoading, selectUsers } from '../redux/users/selectors'

import UserCard from '../components/UserCard'
import Gallery from '../components/Gallery'
import { setUsers } from '../redux/users'

const Users: FC = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const isMoreLoading = useSelector(selectIsUsersMoreLoading)

  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (searchValue) {
      dispatch({
        type: UsersActionsType.LOAD_SEARCH_USERS,
        payload: {
          value: searchValue,
          page,
        },
      })
    } else {
      dispatch({
        type: UsersActionsType.LOAD_USERS,
        payload: page,
      })
    }
  }, [dispatch, searchValue, page])

  const onSearchUsers = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setUsers([]))
      setSearchValue(event.target.value)
    }, 500),
    []
  )

  const onLoadMoreUsers = (): void => {
    setPage((prevState) => prevState + 1)
  }

  return (
    <div>
      <Input onChange={onSearchUsers} placeholder="Search users" autoFocus />
      <Grid container spacing={3}>
        <Gallery
          dataLength={users.length}
          isHasMore={isMoreLoading}
          onNext={onLoadMoreUsers}
        >
          {users?.map(({ node_id: id, avatar_url: avatar, login }) => (
            <UserCard key={id} image={avatar} name={login} />
          ))}
        </Gallery>
      </Grid>
    </div>
  )
}

export default Users
