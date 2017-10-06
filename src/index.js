/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
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

const InfiniteScrollContainer = (props) => <div {...props} />

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
    const CustomReloader = customs.Reloader || InfiniteScrollReloader
    const CustomSpinner = customs.Spinner || InfiniteScrollSpinner
    const CustomContainer = customs.Container || InfiniteScrollContainer

    return (
      <CustomContainer
        ref={ref => { this.container = ref }}
        innerRef={ref => { this.container = ref }}
        id={this.props.infiniteId}
        style={this.getStyle()}
        onScroll={(e) => { this.loadMoreElements(e) }}
      >
        {Header && <Header />}
        {data.map(props => <Row key={props.key} {...props} />)}
        {state.error ?
          <div onClick={actions.loadMore}><CustomReloader /></div>
          : state.hasMore ? <CustomSpinner /> : null}
      </CustomContainer>
    )
  }
}

InfiniteScroll.propTypes = {
  Header: PropTypes.func,
  Row: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    }),
  ),
  style: PropTypes.shape({}),
  options: PropTypes.shape({
    threshold: PropTypes.number,
  }),
  actions: PropTypes.shape({
    loadMore: PropTypes.func.isRequired,
  }).isRequired,
  state: PropTypes.shape({
    hasMore: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  customs: PropTypes.shape({
    Container: PropTypes.func,
    Spinner: PropTypes.func,
    Reloader: PropTypes.func,
  }),
  infiniteId: PropTypes.string,
}

InfiniteScroll.defaultProps = {
  Header: undefined,
  style: undefined,
  options: undefined,
  customs: {
    Container: InfiniteScrollContainer,
    Spinner: InfiniteScrollSpinner,
    Reloader: InfiniteScrollReloader,
  },
  infiniteId: v4(),
  data: [],
}

export default InfiniteScroll
