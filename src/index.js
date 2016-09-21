import React from 'react'

const InfiniteScrollSpinner = () => {
  const style = {
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    padding: '0 0 10px 0',
  }

  return <div style={style}>Loading ...</div>
}

const InfiniteScrollReloader = () => {
  const style = {
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    cursor: 'pointer',
    padding: '10px 0',
  }

  return (
    <div style={style}>
      Error loading data, click to try again
    </div>
  )
}

const InfiniteScroll = (props) => {
  let { height, threshold } = props

  const { items, loadMore, loading, spinner, error, hasMore, reloader } = props

  height = height || '100%'
  threshold = threshold || 0

  const style = {
    div: {
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      height,
    },
  }

  const customReloader = reloader || <InfiniteScrollReloader />

  const customSpinner = spinner || <InfiniteScrollSpinner />
  const displaySpinner = hasMore

  const loadMoreElements = (e) => {
    const componentHeight = e.target.scrollHeight - threshold - 1
    const currentPosition = e.target.offsetHeight + e.target.scrollTop

    if (currentPosition >= componentHeight
      && hasMore === true
      && loading === false
      && error === false) {
      loadMore()
    }
  }

  const tryAgain = () => {
    loadMore()
  }

  const showSpinner = displaySpinner ? customSpinner : null

  return (
    <div style={style.div} onScroll={loadMoreElements}>
      {items}
      {error ?
        <div onClick={tryAgain}>{customReloader}</div>
        : showSpinner
      }
    </div>
  )
}

InfiniteScroll.propTypes = {
  height: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.string]),
  threshold: React.PropTypes.number,
  items: React.PropTypes.node,
  loadMore: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  error: React.PropTypes.bool.isRequired,
  spinner: React.PropTypes.node,
  hasMore: React.PropTypes.bool.isRequired,
  reloader: React.PropTypes.node,
}

export default InfiniteScroll
