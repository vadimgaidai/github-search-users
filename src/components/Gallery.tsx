import { ReactNode, FC } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

interface GalleryTypes {
  children: ReactNode
  dataLength: number
  isHasMore: boolean
  onNext: () => void
}

const Gallery: FC<GalleryTypes> = ({
  children,
  dataLength,
  isHasMore,
  onNext,
}: GalleryTypes) => (
  <Grid item xs={12}>
    <InfiniteScroll
      dataLength={dataLength}
      hasMore={isHasMore}
      next={() => onNext()}
      loader={<CircularProgress />}
    >
      {children}
    </InfiniteScroll>
  </Grid>
)

export default Gallery
