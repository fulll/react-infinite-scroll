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

const infiniteId = 'infinite-scroll'

class InfiniteScroll extends React.Component {
  state = {
    displaySpinner: this.props.state.loading,
  }

  componentWillReceiveProps = nP => {
    if (nP.state.loading && !this.state.displaySpinner) {
      this.setState({ displaySpinner: true })
    } else if (!nP.state.loading
      && this.state.displaySpinner && !nP.state.hasMore) {
      this.setState({ displaySpinner: false })
    }
  }

  getStyle = () => ({
    height: '100%',
    ...this.props.style,
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  })

  showSpinner = e => {
    if (!this.state.displaySpinner) {
      if (e.deltaY > 0 && this.props.state.hasMore) {
        this.setState({ displaySpinner: true })
      }
    }
  }

  loadMoreElements = e => {
    if (e.target.id === infiniteId) {
      const { actions, state, options } = this.props
      let threshold = 0
      if (options && options.threshold) threshold = options.threshold
      const componentHeight = e.target.scrollHeight - threshold - 1
      const currentPosition = e.target.offsetHeight + e.target.scrollTop

      const loadMore =
        currentPosition >= componentHeight
        && state.hasMore
        && !state.loading
        && !state.error

      if (loadMore) actions.loadMore()
    }
  }

  /* eslint-disable */
  render = () => {
    const { children, actions, state, customs } = this.props
    let CustomReloader = InfiniteScrollReloader
    let CustomSpinner = InfiniteScrollSpinner

    if (customs) {
      if (customs.reloader) CustomReloader = customs.reloader
      if (customs.spinner) CustomSpinner = customs.spinner
    }

    return (
      <div
        ref={ref => this.container = ref}
        id={infiniteId}
        style={this.getStyle()}
        onScroll={this.loadMoreElements}
        onWheel={this.showSpinner}
      >
        {children}
        {state.error ?
          <div onClick={actions.loadMore}><CustomReloader /></div>
          : this.state.displaySpinner ? <CustomSpinner /> : null
        }
      </div>
    )
  }
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
    spinner: React.PropTypes.func,
    reloader: React.PropTypes.func,
  }),
}

export default InfiniteScroll
