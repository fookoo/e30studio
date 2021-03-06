# e30Studio

This package is collection of hooks and components

## Getting started

```
yarn add e30studio
```

---

## Hooks

### useToggle

Hook is just sugar syntax over useState 

`useToggle(initialValue = false)`

Response:

```
{ 
    value: boolean
    toggle: () => void
    on, 
    off,
    open, 
    close
}
```

| Name        | Type       | Description        |
|-------------|------------|--------------------|
| value       | boolean    | state of toggle    |
| toggle      | () => void | toggle the state   |
| on / open   | () => void | set state to true  |
| off / close | () => void | set state to false |

##### Example

```typescript jsx
import React from 'react'
import { useToggle } from 'e30studio/hooks'

export const Foo: React.FC = () => {
    const { value, toggle } = useToggle();
    
    return <div>
        <span>{value.toString()}</span>
        <button onClick={toggle}>toggle</button>
    </div>
}
```

### useFeatureFlag

If you want to have feature flag based on your ENV Variables

`useFeatureFlag([FLAG_1, ... ,FLAG_N])`

Response:

```
[boolean, ..., boolean]
```

#### Example

`.env`
```
REACT_APP_USE_NEW_MENU=true
```

```typescript jsx
import React from 'react'
import { useFeatureFlag } from 'e30studio/hooks'
import { MenuV1, MenuV2 } from './components'

export const Foo: React.FC = () => {
    const [isNewMenu] = useFeatureFlag(['USE_NEW_MENU']);
    
    return isNewMenu ? <MenuV2 /> : <MenuV1 /> 
}
```

### useNotification
Hook for invoking notifications, use together with `<Notification />` component

Response:

| Name     | Type                       | Description        |
|----------|----------------------------|--------------------|
| success  | (message, timeout) => void | show success toast |
| info     | (message, timeout) => void | show info toast    |
| warning  | (message, timeout) => void | show warning toast |
| error    | (message, timeout) => void | show error toast   |
| clearAll | () => void                 | Close all toasts   |

`message` can be either `string` or `INotification`

```
export interface INotification {
  title?: string
  message?: string
  timeout?: number
  onClick?: () => void
}
```

by default `success, info, warning` has timeout set to `defaultTimeout` from `<Notification />` component

To disable timeout, set it to `0`

#### Example

```typescript jsx
import React from 'react'
import { useNotification } from 'e30studio/components'

export const Home: React.FC = () => {
  const { success, warn } = useNotification()
  const retry = () => { 
    console.log('do something')
  }
  
  return <div>
    <button onClick={() => success('Button clicked')}>Show notification</button>
    <button onClick={() => warn('Ups...')}>Show warning</button>
    <button onClick={() => warn({
      title: 'Network issues',
      message: 'Fetching user went wrong',
      onClick: retry
    })}>Custom</button>
</div>
}
```

### Components

#### Notifications

Notifications wrapper, use together with useNotification hook
by default its placed top-left corner of screen (z-index: 1000)

Props:

| Name           | Type    | Default | Description                                      |
|----------------|---------|---------|--------------------------------------------------|
| group          | boolean | false   | Group identical toasts together                  |
| showCount      | boolean | true    | Show count when `group = true`                   |
| defaultTimeout | number  | 5000    | default timeout for success, info, warning toast |


##### Example

```typescript jsx
import React from 'react'
import { Notifications } from 'e30studio/components'

export const App: React.FC = () => {
    return <div>
        <Notifications />
        <div>
          <Home />
        </div>
    </div>
}
```
