import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const ColumnsContainer = styled('div')`
  display: grid;
  height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

const Column = styled('div')`
  height: 100%;

  & > *:first-of-type {
    width: 100%;
  }
`

export const LeftColumn = styled(Column)`
  position: relative;

  box-shadow: 0 -3px 5px 1px rgba(0 0 0 / 3%);
`

export const RightColumn = styled(Column)`
  display: flex;
  flex-grow: 1;
  background: rgba(0 0 0 / 0.5%);
  box-shadow: inset 0 -3px 5px 1px rgb(0 0 0 / 3%);

  overflow: auto hidden;
`

export const ResizeBar = styled('div')<{ barWidth: number }>(
  ({ barWidth }) => css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;

    z-index: 1;
    width: ${barWidth}px;
    transform: translateX(${barWidth / 2}px);
    background: black;

    cursor: ew-resize;
    opacity: 0.01;
    transition: opacity 0.25s ease-in-out;

    &:hover {
      opacity: 0.075;
    }
  `
)
