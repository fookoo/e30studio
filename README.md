# e30studio

This package is a collection of React hooks and components, its contains also useful services

## Table of Contents
- [Installation](#installation)
- [Hooks](#hooks)
    - [useToggle](#useToggle)
    - [useFeatureFlag](#useFeatureFlag)
    - [useNotification](#useNotification)
- [Components](#components)
    - [Notifications](#notifications)
    - [SplitView](#splitview)
- [Services](#services)
  - [LocalStorage](#localstorageservice)
  - [SessionStorage](#sessionstorageservice)

---

## Installation

```
yarn add e30studio
```

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

The useFeatureFlag hook is a custom React hook that helps you manage feature flags in your application. It abstracts the process of accessing environment variables, making it compatible with both Create React App (CRA) and Vite. 

#### Example

`.env`
```
REACT_APP_USE_NEW_MENU=true
VITE_USE_NEW_MENU=true
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

## Components

### Notifications

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

### SplitView

The `SplitView` component allows you to create a two-column layout where the width of the left column is adjustable. This component is ideal for creating resizable sidebars or any other layout with an adjustable left pane.

Props:

| Name            | Optional | Type   | Default      | Description                                           |
|-----------------|--------|--------|--------------|-------------------------------------------------------|
| localStorageKey | yes | string | 'split-view' | Key for localstorage to persist width across sessions |
| minWidth        | yes | number | 200          | Minimal width of left column                          |
| maxWidth        | yes | number | 800          | Maximal width of left column                          |


##### Example

```typescript jsx
import React from 'react'
import { SplitView } from 'e30studio/components'

export const App: React.FC = () => {
    return <SplitView>
      <div>Left column</div>
      <div>Right column</div>
    </SplitView>
}
```

### AutoSize

AutoSize component provide dimensions of container


##### Example

```typescript jsx
import { AutoSize } from 'e30studio/components'

export const TestExample = () => (
        <AutoSize>
          {({ width, height }) => (
                  <span>My container is {width}px x {height}px</span>
          )}
        </AutoSize>
)
```

### CopyToClipboard

Wrapper component that provide copy to clipboard functionality


##### Example

```typescript jsx
import { ContentCopy } from '@mui/icons-material'
import { CopyToClipboard } from 'e30studio/components'

const WithIcon = ({ value }) => <CopyToClipboard value={value} icon={<ContentCopy />} />

const WithStyle = styled(WithIcon)`
display: flex;
gap: var(--theme-gap);

.value {
  font-weight: var(--theme-font-bold);
}

.icon {
  &:hover {
    transform: scale(1.1);
  }
}
`
```


## Services

Service is a static class that can perform various things

### LocalStorageService

```typescript
interface ILocalStorageService {
  get<T>(key: string, defaultValue: T, parse?: boolean): T
  set(key: string, value: string | object): void
  clear(): void
}
```

#### example

```typescript jsx
import React from 'react'
import { LocalStorageService } from 'e30studio/services'

export const App: React.FC = () => {
    const value = LocalStorageService.get('my-value', 'default')
    const myObj = LocalStorageService.get('my-obj', { name: '', age: 0 }, true)
  
    return <div>
      <span>value: {value}</span>
      <span>value from object: {myObj.name}</span>
    </div>
}
```

### SessionStorageService

works exactly the same as LocalStorageService but operates over SessionStorage
