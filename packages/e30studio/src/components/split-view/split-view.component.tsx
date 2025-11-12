import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LocalStorageService } from '../../services'
import { Container, Content, Overlay, ResizeBar } from './split-view.style'

export interface SplitViewProps {
  orientation?: 'vertical' | 'horizontal'
  limits?: 'first' | 'second'
  localStorageKey?: string
  min?: number
  max?: number
  className?: string
  children: [React.ReactElement, React.ReactElement]
}

export const SplitView: React.FC<SplitViewProps> = ({
  orientation = 'vertical',
  limits = 'first',
  localStorageKey,
  min,
  max,
  className,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const resizeBarRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef(0)
  const [isResizing, setIsResizing] = useState(false)

  const [size, setSize] = useState<number>(() => {
    if (localStorageKey) {
      const stored = LocalStorageService.get<string | undefined>(localStorageKey, undefined)

      if (stored) {
        const parsed = parseInt(stored, 10)

        if (!isNaN(parsed)) {
          return Math.max(min ?? 0, Math.min(parsed, max ?? Number.MAX_SAFE_INTEGER))
        }
      }
    }

    return 0
  })

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isResizing) return

      const { clientX, clientY } = event
      let newSize = 0

      if (orientation === 'vertical') {
        newSize = limits === 'first' ? clientX : window.innerWidth - clientX
      } else {
        newSize = limits === 'first' ? clientY : window.innerHeight - clientY
      }

      if (typeof min === 'number') {
        newSize = Math.max(newSize, min)
      }

      if (typeof max === 'number') {
        newSize = Math.min(newSize, max)
      }

      sizeRef.current = newSize
      setSize(newSize)
      event.preventDefault()
    },
    [isResizing, orientation, limits, min, max]
  )

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false)
      setSize(sizeRef.current)

      if (localStorageKey) {
        LocalStorageService.set(localStorageKey, sizeRef.current.toString())
      }
    }
  }, [isResizing, localStorageKey])

  const handleMouseDown = useCallback(() => {
    setIsResizing(true)
  }, [])

  const [first, second] = children

  const gridStyle = useMemo(() => {
    if (orientation === 'vertical') {
      const firstSize = limits === 'first' ? `${size}px` : 'auto'
      const secondSize = limits === 'second' ? `${size}px` : 'auto'

      return { gridTemplateColumns: `${firstSize} min-content ${secondSize}` }
    }

    const firstSize = limits === 'first' ? `${size}px` : 'auto'
    const secondSize = limits === 'second' ? `${size}px` : 'auto'

    return { gridTemplateRows: `${firstSize} min-content ${secondSize}` }
  }, [orientation, limits, size])

  useEffect(() => {
    if (size > 0) {
      return
    }

    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const total = orientation === 'vertical' ? rect.width : rect.height

    let initialSize = total / 2

    if (min !== undefined) {
      initialSize = Math.max(initialSize, min)
    }

    if (max !== undefined) {
      initialSize = Math.min(initialSize, max)
    }

    setSize(initialSize)
  }, [orientation, min, max, size])

  useEffect(() => {
    const resizeObj = resizeBarRef.current
    resizeObj?.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      resizeObj?.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp])

  return (
    <Container
      className={`split-view ${className ?? ''}`}
      ref={containerRef}
      style={gridStyle}
      orientation={orientation}
    >
      <Content className="split-view__first">{first}</Content>
      <ResizeBar ref={resizeBarRef} className="split-view__bar" orientation={orientation} />
      <Content className="split-view__second">{second}</Content>
      {isResizing && <Overlay orientation={orientation} />}
    </Container>
  )
}
