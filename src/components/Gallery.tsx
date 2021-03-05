import { ReactNode, FC } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

interface GalleryTypes {
  className?: string
  dataLength: number
  isHasMore: boolean
  children: ReactNode
  onNext: () => void
}

const Gallery: FC<GalleryTypes> = ({
  className,
  dataLength,
  isHasMore,
  children,
  onNext,
}: GalleryTypes) => (
  <Grid item xs={12}>
    <InfiniteScroll
      className={className}
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
