### [Live](https://xeonys.github.io/react-showroom/#scroll)

## react-stateless-infinite-scroll

The real react infinite scroll component

### Usage

##### Sample

```
npm install -S react-stateless-infinite-scroll
```

###### Use in parent div

```jsx
import React from 'react'
import InfiniteScroll from 'react-stateless-infinite-scroll'

const Scroll = (someProps) => {

   const style = {
     height: 100
   }

   return (
    <div style={style.div}>
      <InfiniteScroll
            items={Component}
            loadMore={function}
            hasMore={bool}
            loading={bool}
            spinner={Component}
            error={bool}
            reloader={Component}
      />
    </div>
  )
}
```

###### Use without parent

```jsx
import React from 'react'
import InfiniteScroll from 'react-stateless-infinite-scroll'

const Scroll = (someProps) => {

   const style = {
     height: 100
   }

   return (
     <InfiniteScroll
           height={style.height}
           items={Component}
           loadMore={function}
           hasMore={bool}
           loading={bool}
           spinner={Component}
           error={bool}
           reloader={Component}
     />
  )
}
```

##### Required

- items: __Component__, list of items to display
- loadMore: __function__, function will be called if InfiniteScroll bottom is reached
- threshold: __int__, set custom threshold to call loadmore function, by default function will be called when user reach bottom
- hasMore: __bool__, boolean indicate if there is more items to load
- loading: __bool__, boolean indicate if data is loading
- error: __bool__, boolean indicate if an error occurs, if true reloader component will be displayed

##### Optional

- height: __int__ or __string__, by default InfiniteScroll use '100%' of parent component
- spinner: __Custom Spinner component__, use your own spinner
- reloader: __Custom Reloader component__, use your own reloader
