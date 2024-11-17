import React, { useCallback, useRef, useState } from 'react'

import { BAR_WIDTH, MAX_WIDTH, MIN_WIDTH } from './split-view.const'
import { ColumnsContainer, ResizeBar, LeftColumn, RightColumn } from './split-view.style'
import { LocalStorageService } from '../../services'

interface ISplitViewProps {
  localStorageKey?: string
  minWidth?: number
  maxWidth?: number
  barWidth?: number
  children: [React.ReactElement, React.ReactElement]
}

export const SplitView: React.FC<ISplitViewProps> = ({
  localStorageKey = 'split-view',
  minWidth = MIN_WIDTH,
  maxWidth = MAX_WIDTH,
  barWidth = BAR_WIDTH,
  children
}) => {
  const resizing = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [LeftColumnContent, RightColumnContent] = children
  const [width, setWidth] = useState(() =>
    parseInt(LocalStorageService.get(localStorageKey, `${minWidth}`), 10)
  )

  const handleSaveState = useCallback(() => {
    if (resizing.current) {
      resizing.current = false
      LocalStorageService.set(localStorageKey, width.toString())
    }
  }, [localStorageKey, width])

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (resizing.current) {
        const { currentTarget, clientX } = event
        const newWidth = clientX - currentTarget.offsetLeft

        setWidth(Math.min(Math.max(newWidth, minWidth), maxWidth))
      }

      event.preventDefault()
    },
    [minWidth, maxWidth]
  )

  const startResize = useCallback(() => {
    resizing.current = true
  }, [])

  return (
    <ColumnsContainer
      ref={containerRef}
      style={{
        gridTemplateColumns: `${width}px auto`
      }}
      onMouseMove={handleMove}
      onMouseUp={handleSaveState}
    >
      <LeftColumn style={{ minWidth, maxWidth }}>
        {LeftColumnContent}
        <ResizeBar barWidth={barWidth} onMouseDown={startResize} />
      </LeftColumn>
      <RightColumn>{RightColumnContent}</RightColumn>
    </ColumnsContainer>
  )
}
