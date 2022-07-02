# e30Studio React

## Getting started

```
yarn add @e30studip/react
```

---
## Documentation

### Hooks

#### useToggle

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

#### Example

```typescript jsx
import React from 'react'
import { useToggle } from '@e30stido/react'

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
import { useFeatureFlag } from '@e30stido/react'
import { MenuV1, MenuV2 } from './components'

export const Foo: React.FC = () => {
    const [isNewMenu] = useFeatureFlag(['USE_NEW_MENU']);
    
    return isNewMenu ? <MenuV2 /> : <MenuV1 /> 
}
```
