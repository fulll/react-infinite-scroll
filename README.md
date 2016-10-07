### [Live](https://xeonys.github.io/react-showroom/#scroll)

## react-stateless-infinite-scroll

The best react infinite scroll component, on earth 🌍

### Usage

##### Install

```
npm install -S react-stateless-infinite-scroll
```

##### How to

```jsx
import React from 'react'
import InfiniteScroll from 'react-stateless-infinite-scroll'

const Component = (props) => {

  const infiniteActions = {
    loadMore,
  }

  const infiniteState = {
    hasMore,
    loading,
    error,
  }

  const infiniteCustoms = {
    spinner: <CustomSpinner />,
    reloader: <CustomReloader />,
  }

  const infiniteOptions = {
    threshold: 100,
  }

  const infiniteStyle = {
    height: 300,
  }

  return (
    <InfiniteScroll
      actions={infiniteActions}
      state={infiniteState}
      customs={infiniteCustoms}
      options={infiniteOptions}
      style={infiniteStyle}
    >
     {items.map((item, index) => <Item item={item} key={index} />)}
    </InfiniteScroll>
  )
}
```

##### PropTypes

```jsx
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
```
