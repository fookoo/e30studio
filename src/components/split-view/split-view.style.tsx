import styled from '@emotion/styled'
import { BAR_WIDTH } from './split-view.const'

export const ColumnsContainer = styled('div')`
  display: grid;
  height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

export const LeftColumn = styled('div')`
  position: relative;
  overflow: hidden;

  box-shadow: 0 -3px 5px 1px rgba(0 0 0 / 3%);
`

export const ResizeBar = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -${BAR_WIDTH}px;

  z-index: 1;
  width: ${2 * BAR_WIDTH}px;
  background: black;

  cursor: ew-resize;
  opacity: 0.01;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 0.075;
  }
`

export const RightColumn = styled('div')`
  display: flex;
  flex-grow: 1;
  background: rgba(0 0 0 / 0.5%);
  box-shadow: inset 0 -3px 5px 1px rgb(0 0 0 / 3%);

  overflow: auto hidden;
`
