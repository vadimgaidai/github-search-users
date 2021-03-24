import { ReactNode, FC } from 'react'
import {
  createStyles,
  makeStyles,
  Grid,
  CircularProgress,
} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

interface GalleryTypes {
  className?: string
  dataLength: number
  isHasMore: boolean
  isError?: boolean
  children: ReactNode
  onNext: () => void
}

const useStyles = makeStyles(() =>
  createStyles({
    gallery: {
      position: 'relative',
    },
    content: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      height: '100%',
      columnGap: 30,
      rowGap: 30,
    },
    text: {
      textAlign: 'center',
    },
  })
)

const Gallery: FC<GalleryTypes> = ({
  className,
  dataLength,
  isHasMore,
  isError = false,
  children,
  onNext,
}: GalleryTypes) => {
  const style = useStyles()
  return (
    <Grid className={style.gallery} item xs={12}>
      {isError ? (
        <p className={style.text}>No data :(</p>
      ) : (
        <InfiniteScroll
          className={className}
          dataLength={dataLength}
          hasMore={isHasMore}
          next={() => onNext()}
          loader={<CircularProgress />}
        >
          <div className={style.content}>{children}</div>
        </InfiniteScroll>
      )}
    </Grid>
  )
}
export default Gallery
