import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounceCallback } from '../../hooks/use-debounce-callback/use-debounce-callback.hook'

const allAvailableSpace = {
  width: '100%',
  height: '100%'
}

interface IBoxDimension {
  width: number
  height: number
}

interface IAutoSizerProps {
  style?: React.CSSProperties
  children: (dimensions: IBoxDimension) => React.ReactNode
}

export const AutoSize: React.FC<IAutoSizerProps> = ({ style, children }) => {
  const container = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState<IBoxDimension>(() => {
    return {
      height: container?.current?.clientHeight || 0,
      width: container?.current?.clientWidth || 0
    }
  })

  const handleResize = useCallback(() => {
    if (container.current) {
      const width = container.current?.clientWidth
      const height = container.current?.clientHeight

      setDimension((prev) => {
        if (prev.width !== width || prev.height !== height) {
          return {
            width,
            height
          }
        }

        return prev
      })
    }
  }, [])

  const debouncedHandleResize = useDebounceCallback(handleResize, 20)

  useEffect(() => {
    let observer: ResizeObserver
    const observedElement = container.current

    if (window.ResizeObserver && observedElement) {
      observer = new ResizeObserver(debouncedHandleResize)
      observer.observe(observedElement)
    } else {
      // this is a fallback if ResizeObserver is not supported
      window.addEventListener('resize', debouncedHandleResize)

      setTimeout(debouncedHandleResize, 100)
    }

    return () => {
      if (window.ResizeObserver && observedElement) {
        observer.unobserve(observedElement)
      } else {
        window.removeEventListener('resize', debouncedHandleResize)
      }
    }
  }, [debouncedHandleResize])

  const isInvalidSize = dimension.width === 0 || dimension.height === 0

  return (
    <div ref={container} style={{ ...style, ...allAvailableSpace }}>
      {!isInvalidSize ? children(dimension) : <div style={{ height: '1px', width: '1px' }}></div>}
    </div>
  )
}
