/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce'
import { FC, ChangeEvent, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createStyles,
  makeStyles,
  Grid,
  Input,
  Avatar,
} from '@material-ui/core'

import { UsersActionsType } from '../redux/users/types'
import { selectIsUsersMoreLoading, selectUsers } from '../redux/users/selectors'

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
      setSearchValue(event.target.value)
    }, 500),
    []
  )

  const onLoadMoreUsers = (): void => setPage((prevState) => prevState + 1)

  return (
    <>
      <Input
        disabled={users.length === 0}
        type="text"
        placeholder="Search users"
        onChange={onSearchUsers}
      />
      <Grid container spacing={3}>
        <Gallery
          dataLength={users.length}
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
