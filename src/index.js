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
  const {
    children,
    actions,
    state,
    customs,
    options } = props

  let { style } = props

  let threshold = 0
  if (options) {
    if (options.threshold) threshold = options.threshold
  }

  style = {
    div: {
      height: '100%',
      ...style,
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    },
  }

  let customReloader = <InfiniteScrollReloader />
  let customSpinner = <InfiniteScrollSpinner />

  if (customs) {
    if (customs.reloader) customReloader = customs.reloader
    if (customs.spinner) customSpinner = customs.spinner
  }

  const displaySpinner = state.hasMore

  const loadMoreElements = (e) => {
    const componentHeight = e.target.scrollHeight - threshold - 1
    const currentPosition = e.target.offsetHeight + e.target.scrollTop

    const loadMore =
      currentPosition >= componentHeight
      && state.hasMore
      && !state.loading
      && !state.error

    if (loadMore) actions.loadMore()
  }

  const showSpinner = displaySpinner ? customSpinner : null

  return (
    <div style={style.div} onScroll={loadMoreElements}>
      {children}
      {state.error ?
        <div onClick={actions.loadMore}>{customReloader}</div>
        : showSpinner
      }
    </div>
  )
}

InfiniteScroll.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.shape({}),
  options: React.PropTypes.shape({
    threshold: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    loadMore: React.PropTypes.func.isRequired,
  }).isRequired,
  state: React.PropTypes.shape({
    hasMore: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
  }).isRequired,
  customs: React.PropTypes.shape({
    spinner: React.PropTypes.node,
    reloader: React.PropTypes.node,
  }),
}

export default InfiniteScroll
