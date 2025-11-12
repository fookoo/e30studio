# e30studio

This package is a collection of React hooks and components, its contains also useful services

## Table of Contents
- [Installation](#installation)
- [Hooks](#hooks)
    - [useToggle](#useToggle)
    - [useObject](#useObject)
    - [useMemoObject](#useMemoObject)
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
pnpm add e30studio
npm install e30studio
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
### useObject

Hook for handling object changes easily

##### Example

```typescript jsx
import React, { useCallback } from 'react'
import { useObject } from 'e30studio/hooks'
import { takeValueFromEvent } from 'e30studio/helpers'

export const Foo: React.FC = ({ objProp }) => {
  const { state, get, set, update } = useObject({ prop1: 'value1', prop2: 'value2', prop3: 'value3' });

  const handlePartialUpdate = useCallback(() => update({ prop1: '', prop2: ''}), [update])
  
  const handleClear = useCallback(() => update({ prop1: '', prop2: '', prop3: ''}), [update])
  
  return <div>
    <span>Whole object: {JSON.stringify(state)}</span>
    <span>Part of object: {JSON.stringify(get('prop2'))}</span>
    <span>Set object: <input type="text" value={state.prop2} onChange={takeValueFromEvent(set('prop2'))} /></span>
    <span>Update partial: <button onClick={handlePartialUpdate}>Clear some</button></span>
    <span>Update whole object: <button onClick={handleClear}>Clear all</button></span>
  </div>
}
```


### useMemoObject

Hook for memorizing objects, to use it with other hooks. It uses 'fast-deep-equal' to compare objects

##### Example

```typescript jsx
import React, { useEffect } from 'react'
import { useMemoObject } from 'e30studio/hooks'

export const Foo: React.FC = ({ objProp }) => {
  const stableObject = useMemoObject(objProp);

  useEffect(() => {
    // I am only running when object objProp really changes
  }, [stableObject])

  return <div>
    Happy coding
  </div>
}
```

## Components

### SplitView

The `SplitView` component allows you to create a resizable two-panel layout, either vertical (left/right) or horizontal (top/bottom). You can specify which panel is limited in size via the `limits` prop. Sizes are persisted optionally in local storage. Styling is done via CSS classes.

#### Props

| Name            | Optional | Type                                         | Default       | Description                                                                                     |
|-----------------|----------|---------------------------------------------|---------------|-------------------------------------------------------------------------------------------------|
| orientation     | yes      | `'vertical' | 'horizontal'`                 | `'vertical'`  | Determines whether panels are side by side (vertical) or stacked (horizontal)                  |
| limits          | yes      | `'first' | 'second'`                         | `'first'`     | Indicates which panel's min/max size should be applied                                         |
| min             | yes      | `number`                                    | `undefined`   | Minimal size (px) of the limited panel                                                         |
| max             | yes      | `number`                                    | `undefined`   | Maximal size (px) of the limited panel                                                         |
| localStorageKey | yes      | `string`                                    | `undefined`   | Key to persist the panel size in local storage                                                 |
| className       | yes      | `string`                                    | `undefined`   | Additional CSS class for the container                                                        |
| children        | no       | `[React.ReactElement, React.ReactElement]`  | —             | Two children representing the two panels                                                      |

#### CSS classes

| Element                  | Default class            | Description                                      |
|---------------------------|-------------------------|--------------------------------------------------|
| Container                 | `split-view`            | Wrapper element                                  |
| First panel               | `split-view__first`     | First child panel                                |
| Second panel              | `split-view__second`    | Second child panel                               |
| Resize bar                | `split-view__bar`       | Draggable bar between the panels                |
| Overlay (during resizing) | `split-view__overlay`   | Covers panels during drag to capture events     |

#### Behavior

- If no `min`/`max` is provided, the panels are initially split 50/50.
- If `min` or `max` is provided, the initial split is 50/50 within those limits.
- The panel specified in `limits` respects the `min` and `max` constraints.
- Dragging the resize bar dynamically updates the panel size.
- While resizing, an overlay captures events to avoid accidental selection or interaction.
- Size persists in local storage if `localStorageKey` is provided.

#### Example

```typescript jsx
import React from 'react'
import { SplitView } from 'e30studio/components'

export const App: React.FC = () => {
  return (
          <div style={{ width: '100vw', height: '100vh' }}>
            <SplitView orientation="horizontal" limits="second" min={50} max={400} localStorageKey="main-split">
              <div>Top Panel</div>
              <SplitView orientation="vertical" limits="first" min={50} max={400}>
                <div>Left Panel</div>
                <div>Right Panel</div>
              </SplitView>
            </SplitView>
          </div>
  )
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
