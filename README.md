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

## Components

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
