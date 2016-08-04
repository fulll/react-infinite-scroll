## react-stateless-infinite-scroll

#### Description

The real react infinite scroll component


## Usage

##### Sample

```
npm install -S react-stateless-infinite-scroll
```

```jsx
import React from 'react'
import Input from 'react-stateless-infinite-scroll'

const Scroll = (someProps) => {

   return (
    <div style={style.div}>
      <InfiniteScroll
            height={int}
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

##### Required

- height: __int__
- items: __Component__
- loadMore: __function__
- hasMore: __bool__
- loading: __bool__
- error: __bool__

##### Optional

- spinner: __Custom Spinner component__
- reloader: __Custom Reloader component__

