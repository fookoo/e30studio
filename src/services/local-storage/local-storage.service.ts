interface ILocalStorageService {
  get<T>(key: string, defaultValue: T, parse?: boolean): T
  set(key: string, value: string | object): void
  clear(): void
}

const isSupported = () => {
  return 'localStorage' in window
}

export const LocalStorageService: ILocalStorageService = {
  get<T = string>(key: string, defaultValue: T, parse = false): T {
    if (isSupported()) {
      try {
        const value = window.localStorage.getItem(key)

        if (value) {
          return (parse ? JSON.parse(value) : value) as T
        }
      } catch {
        console.error(`Failed to get ${key} from localStorage`)
      }
    }

    return defaultValue
  },

  set(key: string, value: string | object) {
    if (isSupported()) {
      try {
        window.localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
      } catch {
        console.error(`Failed to set ${key} to localStorage`)
      }
    }
  },

  clear() {
    if (isSupported()) {
      try {
        window.localStorage.clear()
      } catch {
        console.error(`Failed to clear localStorage`)
      }
    }
  }
}
