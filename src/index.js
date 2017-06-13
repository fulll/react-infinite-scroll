/* eslint-disable no-nested-ternary */
import React from 'react'
import { v4 } from 'uuid'

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

class InfiniteScroll extends React.Component {
  shouldComponentUpdate = nP => {
    if (nP.state.error !== this.props.state.error) return true
    if (nP.state.hasMore !== this.props.state.hasMore) return true
    if (JSON.stringify(nP.data) !== JSON.stringify(this.props.data)) return true
    return false
  }

  getStyle = () => ({
    height: '100%',
    ...this.props.style,
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  })

  loadMoreElements = e => {
    if (e.target.id === this.props.infiniteId) {
      const { actions, state, options } = this.props
      let threshold = 0
      if (options && options.threshold) threshold = options.threshold
      const componentHeight = e.target.scrollHeight - threshold - 1
      const currentPosition = e.target.offsetHeight + e.target.scrollTop

      const loadMore =
        currentPosition >= componentHeight
        && state.hasMore
        && !state.error

      if (loadMore) {
        if (this.timeoutLoadMore) clearTimeout(this.timeoutLoadMore)
        this.timeoutLoadMore = setTimeout(actions.loadMore, 200)
      }
    }
  }

  render = () => {
    const { data, Row, Header, actions, state, customs } = this.props
    const CustomReloader = customs.reloader || InfiniteScrollReloader
    const CustomSpinner = customs.spinner || InfiniteScrollSpinner
    return (
      <div
        ref={ref => { this.container = ref }}
        id={this.props.infiniteId}
        style={this.getStyle()}
        onScroll={(e) => { this.loadMoreElements(e) }}
      >
        {Header && <Header />}
        {data.map(props => <Row key={props.key} {...props} />)}
        {state.error ?
          <div onClick={actions.loadMore}><CustomReloader /></div>
          : state.hasMore ? <CustomSpinner /> : null}
      </div>
    )
  }
}

InfiniteScroll.propTypes = {
  Header: React.PropTypes.func,
  Row: React.PropTypes.func.isRequired,
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]).isRequired,
    }),
  ),
  style: React.PropTypes.shape({}),
  options: React.PropTypes.shape({
    threshold: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    loadMore: React.PropTypes.func.isRequired,
  }).isRequired,
  state: React.PropTypes.shape({
    hasMore: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
  }).isRequired,
  customs: React.PropTypes.shape({
    spinner: React.PropTypes.func,
    reloader: React.PropTypes.func,
  }),
  infiniteId: React.PropTypes.string,
}

InfiniteScroll.defaultProps = {
  customs: {
    spinner: InfiniteScrollSpinner,
    reloader: InfiniteScrollReloader,
  },
  infiniteId: v4(),
  data: [],
}

export default InfiniteScroll
