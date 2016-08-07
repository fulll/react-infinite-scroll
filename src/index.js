import React from 'react'

const InfiniteScrollSpinner = () => {

    let style = {
      width: '100%',
      fontSize: 12,
      textAlign: 'center',
      padding: '0 0 10px 0'
    }

    return <div style={style}>Loading ...</div>
}

const InfiniteScrollReloader = () => {

    let style = {
      width: '100%',
      fontSize: 12,
      textAlign: 'center',
      cursor: 'pointer',
      padding: '10px 0'
    }

    return (
      <div style={style}>
        Error loading data, click to try again
      </div>
    )
}

const InfiniteScroll = (props) => {

  let {
    height,
    items,
    loadMore,
    hasMore,
    loading,
    error,
    spinner,
    reloader,
    threshold,
  } = props

  height = height ? height : '100%'
  threshold = threshold ? threshold : 0

  const style = {
    div: {
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      height
    }
  }

  let customReloader = reloader ? reloader : <InfiniteScrollReloader />

  let customSpinner = spinner ? spinner : <InfiniteScrollSpinner />
  let displaySpinner = hasMore ? true : false

  const loadMoreElements = (e) => {

    let componentHeight = e.target.scrollHeight - threshold - 1
    let currentPosition = e.target.offsetHeight + e.target.scrollTop

    if (currentPosition >= componentHeight
      && hasMore == true
      && loading == false
      && error == false) {
        loadMore()
    }
  }

  const tryAgain = () => {
    loadMore()
  }

  return (
    <div style={style.div} onScroll={loadMoreElements}>
        {items}
        {error ?
          <div onClick={tryAgain}>{customReloader}</div>
          : displaySpinner ?
            customSpinner
            : null
        }
    </div>
  )
}

export default InfiniteScroll
