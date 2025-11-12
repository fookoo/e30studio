import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LocalStorageService } from '../../services'
import { Container, Content, Overlay, ResizeBar } from './split-view.style'

export interface SplitViewProps {
  orientation?: 'vertical' | 'horizontal'
  limits?: 'first' | 'second'
  localStorageKey?: string
  min?: number
  max?: number
  barSize?: number
  children: [React.ReactElement, React.ReactElement]
}

export const SplitView: React.FC<SplitViewProps> = ({
  orientation = 'vertical',
  limits = 'first',
  localStorageKey,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  barSize = 6,
  children
}) => {
  const resizeBarRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef(0)
  const [isResizing, setIsResizing] = useState(false)
  const [size, setSize] = useState(() => {
    if (localStorageKey) {
      return parseInt(LocalStorageService.get(localStorageKey, `${min}`), 10)
    }
  })

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isResizing) return

      const { clientX, clientY } = event
      let newSize = 0

      if (orientation === 'vertical') {
        const offset = limits === 'first' ? clientX : window.innerWidth - clientX
        newSize = Math.min(Math.max(offset, min), max)
      } else {
        const offset = limits === 'first' ? clientY : window.innerHeight - clientY
        newSize = Math.min(Math.max(offset, min), max)
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
      return {
        gridTemplateColumns:
          limits === 'first' ? `${size}px ${barSize}px auto` : `auto ${barSize}px ${size}px`
      }
    }

    return {
      gridTemplateRows:
        limits === 'first' ? `${size}px ${barSize}px auto` : `auto ${barSize}px ${size}px`
    }
  }, [barSize, orientation, limits, size])

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
    <Container style={gridStyle} orientation={orientation}>
      <Content>{first}</Content>
      <ResizeBar ref={resizeBarRef} orientation={orientation} barSize={barSize} />
      <Content>{second}</Content>
      {isResizing && <Overlay orientation={orientation} />}
    </Container>
  )
}
