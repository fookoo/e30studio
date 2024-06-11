interface ISessionStorageService {
  get<T>(key: string, defaultValue: T, parse?: boolean): T
  set(key: string, value: string | object): void
  clear(): void
}

const isSupported = () => {
  return 'sessionStorage' in window
}

export const SessionStorageService: ISessionStorageService = {
  get<T>(key: string, defaultValue: T, parse = false): T {
    if (isSupported()) {
      try {
        const value = window.sessionStorage.getItem(key)

        if (parse && value) {
          return JSON.parse(value) as T
        }
      } catch {
        console.error(`Failed to get ${key} from sessionStorage`)
      }
    }

    return defaultValue
  },

  set(key: string, value: string | object) {
    if (isSupported()) {
      try {
        window.sessionStorage.setItem(
          key,
          typeof value === 'object' ? JSON.stringify(value) : value
        )
      } catch {
        console.error(`Failed to set ${key} to sessionStorage`)
      }
    }
  },

  clear() {
    if (isSupported()) {
      try {
        window.sessionStorage.clear()
      } catch {
        console.error(`Failed to clear sessionStorage`)
      }
    }
  }
}
