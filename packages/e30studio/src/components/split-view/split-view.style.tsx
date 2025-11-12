import styled from '@emotion/styled'

export const Container = styled.div<{ orientation: 'vertical' | 'horizontal' }>`
  display: grid;
  width: 100%;
  height: 100%;
  ${({ orientation }) =>
    orientation === 'vertical'
      ? `grid-template-columns: auto 6px auto;`
      : `grid-template-rows: auto 6px auto;`}
  position: relative;
  overflow: hidden;
`

export const Content = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`

export const ResizeBar = styled.div<{ barSize: number; orientation: 'vertical' | 'horizontal' }>`
  ${({ orientation, barSize }) =>
    orientation === 'vertical'
      ? `
        width: ${barSize}px;
        cursor: ew-resize;
        `
      : `
        height: ${barSize}px;
        cursor: ns-resize;
        `}
  background-color: rgba(0, 0, 0, 0.1);
  user-select: none;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const Overlay = styled.div<{ orientation: 'vertical' | 'horizontal' }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: transparent;
  cursor: ${({ orientation }) => (orientation === 'vertical' ? 'ew-resize' : 'ns-resize')};
`
