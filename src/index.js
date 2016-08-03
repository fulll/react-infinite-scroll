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
    reloader
  } = props

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

    let componentHeight = e.target.scrollHeight - 1
    let currentPosition = style.div.height + e.target.scrollTop

    if (currentPosition >= componentHeight
      && hasMore == true
      && loading == false
      && error == false) {
        setTimeout( () => {
          loadMore()
        }, 500)
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
